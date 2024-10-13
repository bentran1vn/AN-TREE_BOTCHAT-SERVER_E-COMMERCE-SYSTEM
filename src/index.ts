import express, { Request, Response, Application } from 'express'
import axios from 'axios'
import { create } from 'lodash'
import { createMessage } from '@botpress/chat/dist/gen/client'
import { send } from 'process'
import http from 'http'
import sequelize from '~/config/dbConfig'
import WebSocket from 'ws'
import usersService from '~/services/userService'

const app: Application = express()
const wsServer = new WebSocket.Server({
  port: 9001 // This is the port our websocket server will listen on
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

const port = 9000
// user-key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkxvbmciLCJpYXQiOjE3Mjg1NzcwMzN9.Wm39prUOirXLw0pgHEhCV3NWz8NRKq2eKQ1j3knXUQE"
// conversationId: "Long"
// messId: "81aa9a45-5d8f-49d3-a274-27054fe27e6a"
app.use(express.json())

wsServer.on('connection', (ws: WebSocket) => {
  console.log('New WebSocket connection established.')

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log('Received Message:', message.toString())

    // Send back a message to the client
    ws.send(`Server received: ${message.toString()}`)
  })

  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('WebSocket connection closed.')
  })
})

app.post('/chatAuto', async (req: Request, res: Response) => {
  await axios.request({
    method: 'POST',
    url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/messages',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH',
      'x-user-key':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
      'content-type': 'application/json'
    },
    data: req.body
  })

  const listMess = {
    method: 'GET',
    url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/Long/messages',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH',
      'x-user-key':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
      'content-type': 'application/json'
    }
  }

  const oldLength = await axios
    .request(listMess)
    .then(function (response) {
      return response.data.messages.length
    })
    .catch(function (error) {
      console.error(error)
      return res.json({
        error: error.message
      })
    })

  const intervalId = await setInterval(async () => {
    await axios
      .request(listMess)
      .then(function (response) {
        // return response.data.messages.length
        if (response.data.messages.length > oldLength) {
          clearInterval(intervalId) // Ngừng kiểm tra
          return res.json({
            result: response.data
          })
        }
      })
      .catch(function (error) {
        console.error(error)
        return res.json({
          error: error.message
        })
      })
  }, 1000)
})

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

app.listen(port, () => {
  console.log('port:', port)
})
