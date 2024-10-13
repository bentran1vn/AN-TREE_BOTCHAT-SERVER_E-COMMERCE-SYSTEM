import express, { Request, Response, Application } from 'express'
import axios, { AxiosRequestConfig } from 'axios'
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
  ws.on('message', async (message) => {
    // Added async here
    var data = {
      conversationId: 'Long',
      payload: {
        type: 'text',
        text: message.toString()
      }
    }

    // Handle Send Message to Chat box
    console.log('Received Message:', data)

    // Function to delay for a specified time (in milliseconds)
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    // Await for 10 seconds
    await delay(2000) // 10 seconds = 10000 ms

    // Send back a message to the client after the delay
    ws.send(`Server received: ${message.toString()}`)
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

app.post('/chatAuto', async (req: Request, res: Response) => {
  try {
    // Send message
    await axios(createAxiosConfig('POST', '/messages', req.body))

    // Get initial message count
    const initialResponse = await axios(createAxiosConfig('GET', '/conversations/Long/messages'))
    const initialMessageCount = initialResponse.data.messages.length

    // Poll for new messages
    const pollForNewMessages = async () => {
      try {
        const response = await axios(createAxiosConfig('GET', '/conversations/Long/messages'))
        if (response.data.messages.length > initialMessageCount) {
          return res.json({ result: response.data })
        }
        setTimeout(pollForNewMessages, 1000)
      } catch (error) {
        handleAxiosError(error, res)
      }
    }

    pollForNewMessages()
  } catch (error) {
    handleAxiosError(error, res)
  }
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
