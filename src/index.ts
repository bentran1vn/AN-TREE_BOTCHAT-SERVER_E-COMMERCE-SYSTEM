import express, { Request, Response, Application } from 'express'
import axios, { AxiosRequestConfig } from 'axios'
import { create } from 'lodash'
import { createMessage } from '@botpress/chat/dist/gen/client'
import { env, send } from 'process'
import http from 'http'
import sequelize from '~/config/dbConfig'
import WebSocket from 'ws'
import usersService from '~/services/userService'
import EventSource from 'eventsource'

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

const url = 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/Tan/listen'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-user-key':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRhbiIsImlhdCI6MTcyODg5ODg4N30.FLRxlE97bKxdY5j2O8LuvlofTMJT3xWa-jrkcpudycc'
  }
}

type Message = {
  type: string
  data: BotPress
}

type BotPress = {
  type: string
  data: {
    id: string
    userId: string
    conversationId: string
    isBot: boolean
    createdAt: string
    payload: {
      type: string
      text: string
    }
  }
}

const eventSource = new EventSource(url, options)

eventSource.onmessage = (event) => {
  // Parse event.data as it comes in as a JSON string
  console.log(event)
  try {
    const messageData: BotPress = JSON.parse(event.data)

    // Check if the parsed data contains bot-generated messages
    if (messageData?.data?.isBot) {
      wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          // Send the bot's response text to WebSocket clients
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

  // Listen for messages from the client
  ws.on('message', async (message) => {
    // Added async here
    var data = {
      conversationId: 'Tan',
      payload: {
        type: 'text',
        text: message.toString()
      }
    }

    // Handle Send Message to Chat box
    console.log('Received Message:', message.toString())

    // Function to delay for a specified time (in milliseconds)
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    // Await for 10 seconds
    await delay(2000) // 10 seconds = 10000 ms

    // Send back a message to the client after the delay
    await axios(createAxiosConfig('POST', '/messages', data))

    // ws.send(`Server received: ${message.toString()}`)
  })

  // Handle WebSocket disconnections
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

const handleAxiosError = (error: any, res: Response) => {
  console.error('Axios error:', error.message)
  res.status(500).json({ error: error.message })
}

app.post('/chat', async (req: Request, res: Response) => {
  try {
    // Send message
    await axios(createAxiosConfig('POST', '/messages', req.body))
  } catch (error) {
    handleAxiosError(error, res)
  }
})

// 1 API Bắt đầu trò chuyện ( Cái này ko có JWT TOKEN)
// Tạo User, và Tạo Conversation
// Sau đó nhét vào DB ( Redis )

// ChatAuto WebSocket ( Cái này có JWT TOKEN )
// Nếu mà có tin nhắn mới thì sẽ gửi về cho Client Botpress

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
