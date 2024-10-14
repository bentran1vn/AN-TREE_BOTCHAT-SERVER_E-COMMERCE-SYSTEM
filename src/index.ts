import express, { Request, Response, Application } from 'express'
import axios, { AxiosRequestConfig } from 'axios'
import sequelize from '~/config/dbConfig'
import WebSocket from 'ws'
import usersService from '~/services/userService'
import EventSource from 'eventsource'
import { BotPress } from '~/message.type'

const WEBSOCKET_PORT = parseInt(process.env.WEBSOCKET_PORT as string)

const app: Application = express()
const wsServer = new WebSocket.Server({
  port: WEBSOCKET_PORT // This is the port our websocket server will listen on
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.')
    return sequelize.sync() // This creates the table if it doesn't exist
  })
  .then(() => {
    console.log('Database synchronized.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

app.use(express.json())

const url = 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/Tan/listen'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-user-key':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRhbiIsImlhdCI6MTcyODg5ODg4N30.FLRxlE97bKxdY5j2O8LuvlofTMJT3xWa-jrkcpudycc'
  }
}

const eventSource = new EventSource(url, options)

eventSource.onmessage = (event) => {
  console.log(event)
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

wsServer.on('connection', (ws: WebSocket) => {
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

const BASE_URL = process.env.BASE_URL
const AUTH_TOKEN = process.env.AUTH_TOKEN
const USER_KEY = process.env.USER_KEY

const headers = {
  accept: 'application/json',
  Authorization: AUTH_TOKEN,
  'x-user-key': USER_KEY,
  'content-type': 'application/json'
}

const createAxiosConfig = (method: string, url: string, data?: any): AxiosRequestConfig => ({
  method,
  url: `${BASE_URL}${url}`,
  headers,
  data
})

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

app.listen(HTTP_PORT, () => {
  console.log('port:', HTTP_PORT)
})
