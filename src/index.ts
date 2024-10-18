import express, { Request, Response, Application } from 'express'
import axios, { AxiosRequestConfig } from 'axios'
import sequelize from '~/config/dbConfig'
import WebSocket from 'ws'
import usersService from '~/services/userService'
import EventSource from 'eventsource'
import { BotPress } from '~/message.type'
import { IncomingMessage } from 'http'
import jwt from 'jsonwebtoken'
import { CreateAxiosConfigFunction } from '~/utils'

const WEBSOCKET_PORT = parseInt(process.env.WEBSOCKET_PORT as string)

const app: Application = express()
const wsServer = new WebSocket.Server({
  port: WEBSOCKET_PORT
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.')
    return sequelize.sync()
  })
  .then(() => {
    console.log('Database synchronized.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

app.use(express.json())

const url = 'https://chat.botpress.cloud/07c5064a-c698-44df-bfd5-487f180e6565/conversations/Tan/listen'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-user-key':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRhbiIsImlhdCI6MTcyOTA0MjQwMH0.kdFMM3RrsNPkjkJ-OH9N-F6Mm_jf1PR8bkb4eK1if8M'
  }
}

const eventSource = new EventSource(url, options)

eventSource.onmessage = (event) => {
  try {
    const messageData: BotPress = JSON.parse(event.data)

    if (messageData?.data?.isBot) {
      wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageData?.data?.payload.text)
        }
      })
    }
  } catch (error) {
    console.error('Failed to parse event data:', error)
  }
}

wsServer.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const url = new URL(req.url as string, `http://${req.headers.host}`)
  const token = url.searchParams.get('token')

  if (token == null) {
    console.log('Token is Empty !')
    ws.close()
  }

  try {
    const decoded = jwt.verify(token as string, process.env.SECRETKEY as string, {
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE
    })
    console.log('User authenticated', decoded)
    // Proceed with the WebSocket connection
  } catch (err) {
    console.log('Invalid token !')
    ws.close() // Close connection if token is invalid
  }

  console.log('New WebSocket connection established.')

  ws.on('message', async (message) => {
    var data = {
      conversationId: 'Tan',
      payload: {
        type: 'text',
        text: message.toString()
      }
    }

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    await delay(2000) // 10 seconds = 10000 ms

    try {
      await axios(createAxiosConfig('POST', '/messages', data))
    } catch (error) {
      console.error('Error sending message:', error)
    }
  })

  ws.on('close', () => {
    console.log('WebSocket connection closed.')
  })
})

const BASE_URL = process.env.BASE_URL as string
const USER_KEY = process.env.USER_KEY as string

const headers = {
  accept: 'application/json',
  'x-user-key': USER_KEY,
  'content-type': 'application/json'
}

const createAxiosConfig = (method: string, url: string, data?: any): AxiosRequestConfig => ({
  method,
  url: `${BASE_URL}${url}`,
  headers,
  data
})

const createAxiosConfig11 = CreateAxiosConfigFunction(USER_KEY, BASE_URL)

// 1 API Bắt đầu trò chuyện ( Cái này ko có JWT TOKEN)
// Tạo User, và Tạo Conversation
// Sau đó nhét vào DB ( Redis )

// ChatAuto WebSocket ( Cái này có JWT TOKEN )
// Nếu mà có tin nhắn mới thì sẽ gửi về cho Client Botpress

const HTTP_PORT = parseInt(process.env.HTTP_PORT as string)

app.get('/test', async (req: any, res: any) => {
  try {
    const user = await usersService.findUserById('fe77b708-1d63-4a13-a765-4bbbd493c10a')

    if (user) {
      return res.json(user)
    } else {
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/messAuto', async (req: Request, res: Response) => {
  const { conversationId, payload } = req.body
  const createMess = {
    method: 'POST',
    url: `${BASE_URL}/messages`,
    headers: {
      accept: 'application/json',
      'x-user-key': USER_KEY,
      'content-type': 'application/json'
    },
    data: {
      conversationId,
      ...payload
    }
  }

  await axios
    .request(createMess)
    .then(function (response) {
      console.log(response.data)
      return res.json({
        result: response.data
      })
    })
    .catch(function (error) {
      console.error(error)
      return res.json({
        error: error.message
      })
    })
})

app.post('/user', async (req: Request, res: Response) => {
  const createUser = {
    method: 'POST',
    url: `${BASE_URL}/users`,
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    data: req.body
  }

  await axios
    .request(createUser)
    .then(function (response) {
      return res.json({
        result: response.data
      })
    })
    .catch(function (error) {
      console.error(error)
      return res.json({
        error: error.message
      })
    })
})

app.delete('/delUser', async (req: Request, res: Response) => {
  const deleteUser = {
    method: 'DELETE',
    url: `${BASE_URL}/users/me`,
    headers: { accept: 'application/json', 'x-user-key': USER_KEY, 'content-type': 'application/json' }
  }
  await axios
    .request(deleteUser)
    .then(function (response) {
      return res.json({
        message: 'Đã xóa thành công',
        result: response.data
      })
    })
    .catch(function (error) {
      return res.json({
        message: 'xóa không thành công',
        error: error.message
      })
    })
})

app.post('/conversationAuto', async (req: Request, res: Response) => {
  // Gọi API createConversation
  try {
    const conversationResponse = await axios.request({
      method: 'POST',
      url: `${BASE_URL}/conversations/get-or-create`,
      headers: {
        accept: 'application/json',
        'x-user-key': USER_KEY,
        'content-type': 'application/json'
      },
      data: req.body
    })
    const sayHi = { type: 'text', text: 'hi' }
    const conversationId = conversationResponse.data.conversation.id
    const payload = {
      payload: sayHi
    }
    // return res.redirect(`/messAuto?conversationId=${conversationId}&payload=${payload}`);
    await axios
      .post(`http://localhost:${HTTP_PORT}/messAuto`, {
        conversationId: conversationId,
        payload: payload
      })
      .then(function (response) {
        return res.json({
          result: response.data
        })
      })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.delete('/delCon', async (req: Request, res: Response) => {
  const listConversation = {
    method: 'DELETE',
    url: `${BASE_URL}/conversations/Tan`,
    headers: { accept: 'application/json', 'x-user-key': USER_KEY, 'content-type': 'application/json' }
  }
  await axios
    .request(listConversation)
    .then(function (response) {
      return res.json({
        message: 'Đã xóa thành công',
        result: response.data
      })
    })
    .catch(function (error) {
      return res.json({
        message: 'xóa không thành công',
        error: error.message
      })
    })
})

app.listen(HTTP_PORT, () => {
  console.log('port:', HTTP_PORT)
})
