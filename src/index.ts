//---------------------------------------------------------------------------------------------------------------
import express, { Request, Response } from 'express'
import axios from 'axios'
import { create } from 'lodash'
import { createMessage } from '@botpress/chat/dist/gen/client'
import { send } from 'process'

const app = express()
const port = 5000
// user-key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkxvbmciLCJpYXQiOjE3Mjg1NzcwMzN9.Wm39prUOirXLw0pgHEhCV3NWz8NRKq2eKQ1j3knXUQE"
// conversationId: "Long"
// messId: "81aa9a45-5d8f-49d3-a274-27054fe27e6a"
app.use(express.json())
// app.post('/user', async (req: Request, res: Response) => {
//   const createUser = {
//     method: 'POST',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/users',
//     headers: {accept: 'application/json', 'content-type': 'application/json'},
//     data: req.body
//   };

//   await axios
//     .request(createUser)
//     .then(function (response) {
//       return res.json({
//         result: response.data
//       })

//     })
//     .catch(function (error) {
//       console.error(error);
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/chat', async (req: Request, res: Response) => {
//   const createConversation = {
//     method: 'POST',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/get-or-create',
//     headers: {accept: 'application/json', 'x-user-key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E",'content-type': 'application/json'},
//     data: req.body
//   };

//   await axios
//     .request(createConversation)
//     .then(function (response) {
//       console.log(response.data)
//       return res.json({
//         result: response.data
//       })
//     })
//     .catch(function (error) {
//       console.error(error)
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/listenConversation', async (req: Request, res: Response) => {
//   const listConversation = {
//     method: 'GET',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/Long/listen',
//     headers: {accept: 'application/json', 'x-user-key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E",'content-type': 'application/json'},
//     // data: req.body
//   };
//   await axios
//     .request(listConversation)
//     .then(function (response) {
//       console.log(response.data)
//       return res.json({
//         result: response.data
//       })
//     })
//     .catch(function (error) {
//       console.error(error)
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/delCon', async (req: Request, res: Response) => {
//   const listConversation = {
//     method: 'DELETE',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/Long',
//     headers: {accept: 'application/json', 'x-user-key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E",'content-type': 'application/json'},
//     // data: req.body
//   };
//   await axios
//     .request(listConversation)
//     .then(function (response) {
//       return res.json({
//         message: "Đã xóa thành công",
//         result: response.data
//       });
//     })
//     .catch(function (error) {
//       console.error(error)
//       return res.json({
//         message: "xóa không thành công",
//         error: error.message
//       })
//     });
//   })
// app.post('/mess', async (req: Request, res: Response) => {
//   const createMess = {
//     method: 'POST',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/messages',
//     headers: {
//       accept: 'application/json',
//       // 'x-integration-id': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       // 'x-bot-id': 'a',
//       'Authorization': 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH',
//       'x-user-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       'content-type': 'application/json'
//     },
//     data: req.body
//   };

//   await axios
//     .request(createMess)
//     .then(function (response) {
//       console.log(response.data)
//       return res.json({
//         result: response.data
//       })
//     })
//     .catch(function (error) {
//       console.error(error)
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/messAuto', async (req: Request, res: Response) => {
//   const { conversationId, payload } = req.body;
//   const createMess = {
//     method: 'POST',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/messages',
//     headers: {
//       accept: 'application/json',
//       // 'x-integration-id': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       // 'x-bot-id': 'a',
//       'Authorization': 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH',
//       'x-user-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       'content-type': 'application/json'
//     },
//     data: {
//       conversationId,
//       ...payload
//     }
//   };

//   await axios
//     .request(createMess)
//     .then(function (response) {
//       console.log(response.data)
//       return res.json({
//         result: response.data
//       })
//     })
//     .catch(function (error) {
//       console.error(error)
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/getMess', async (req: Request, res: Response) => {
//   const getMess = {
//     method: 'GET',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/messages/81aa9a45-5d8f-49d3-a274-27054fe27e6a',
//     headers: {
//       accept: 'application/json',
//       // 'x-integration-id': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       // 'x-bot-id': 'a',
//       'Authorization': 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH',
//       'x-user-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       'content-type': 'application/json'
//     },
//     // data: req.body
//   };

//   await axios
//     .request(getMess)
//     .then(function (response) {
//       console.log(response.data)
//       return res.json({
//         result: response.data
//       })
//     })
//     .catch(function (error) {
//       console.error(error)
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/listMess', async (req: Request, res: Response) => {
//   const listMess = {
//     method: 'GET',
//     url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/Long/messages',
//     headers: {
//       accept: 'application/json',
//       // 'x-integration-id': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       // 'x-bot-id': 'a',
//       'Authorization': 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH',
//       'x-user-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
//       'content-type': 'application/json'
//     },
//     // data: req.body
//   };

//   const messagesLength = await axios
//     .request(listMess)
//     .then(function (response) {
//       console.log(response.data.messages.length)
//       return response.data.messages.length
//     })
//     .catch(function (error) {
//       console.error(error)
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/work', async (req: Request, res: Response) => {
//   const getWorkspace = {
//     method: 'GET',
//     url: 'https://api.botpress.cloud/v1/admin/workspaces/wkspace_01J8D672VEKKFNJX6Q3E6DCY9H',
//     headers: {accept: 'application/json', 'Authorization': 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH', 'content-type': 'application/json'},
//     // data: req.body
//   };
//   console.log(getWorkspace.headers);

//   await axios
//     .request(getWorkspace)
//     .then(function (response) {
//       console.log(response.data);
//       return res.json({
//         result: response.data
//       })

//     })
//     .catch(function (error) {
//       console.error(error);
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/bot', async (req: Request, res: Response) => {
//   const getBot = {
//     method: 'GET',
//     url: 'https://api.botpress.cloud/v1/admin/bots/4517de83-672e-4ee8-9e94-7ed16e138afb',
//     headers: {accept: 'application/json', 'Authorization': 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH', 'x-workspace-id': 'wkspace_01J8D672VEKKFNJX6Q3E6DCY9H', 'content-type': 'application/json'},
//     // data: req.body
//   };
//   console.log(getBot.headers);

//   await axios
//     .request(getBot)
//     .then(function (response) {
//       console.log(response.data);
//       return res.json({
//         result: response.data
//       })

//     })
//     .catch(function (error) {
//       console.error(error);
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/integration', async (req: Request, res: Response) => {
//   const createIntegration = {
//     method: 'POST',
//     url: 'https://api.botpress.cloud/v1/admin/integrations',
//     headers: {accept: 'application/json', 'Authorization': 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH', 'x-workspace-id': 'wkspace_01J8D672VEKKFNJX6Q3E6DCY9H', 'content-type': 'application/json'},
//     data: req.body
//   };
//   console.log(createIntegration.headers);

//   await axios
//     .request(createIntegration)
//     .then(function (response) {
//       console.log(response.data);
//       return res.json({
//         result: response.data
//       })

//     })
//     .catch(function (error) {
//       console.error(error);
//       return res.json({
//         error: error.message
//       })
//     });
//   })
// app.post('/conversationAuto', async (req: Request, res: Response) => {
//     // Gọi API createConversation
//     try {
//     const conversationResponse = await axios.request({
//       method: 'POST',
//       url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/conversations/get-or-create',
//       headers: {
//         accept: 'application/json',
//         'x-user-key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E",
//         'content-type': 'application/json'
//       },
//       data: req.body
//     });
//     const sayHi = { type: 'text', text: 'hi' }
//     const conversationId = conversationResponse.data.conversation.id;
//     const payload = {
//       payload: sayHi
//     };
//     // return res.redirect(`/messAuto?conversationId=${conversationId}&payload=${payload}`);
//     await axios.post(`http://localhost:${port}/messAuto`, {
//       conversationId: conversationId,
//       payload: payload
//     }).then(function (response) {
//       console.log(response.data)
//       return res.json({
//         result: response.data
//       })
//     });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
app.post('/chatAuto', async (req: Request, res: Response) => {
  await axios.request({
    method: 'POST',
    url: 'https://chat.botpress.cloud/cc72f54c-2498-4da9-ab75-5a98365f7b06/messages',
    headers: {
      accept: 'application/json',
      // 'x-integration-id': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
      // 'x-bot-id': 'a',
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
      // 'x-integration-id': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
      // 'x-bot-id': 'a',
      Authorization: 'Bearer bp_pat_sIVe99KsGHaSc6ovXixwnR4SOlhr8cqMMJaH',
      'x-user-key':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvYW5oIiwiaWF0IjoxNzI4NDkxMjgwfQ.kLnk-KG44kMIPphXzZlW3ooruEXZmk23t_UVbKVsy_E',
      'content-type': 'application/json'
    }
    // data: req.body
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

app.listen(port, () => {
  console.log('port:', port)
})
