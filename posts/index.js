const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')

const axios = require('axios')

const PORT = 3030

const posts = {}

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/posts', async (request, response) => {
  const { post } = request.body
  const id = randomBytes(8).toString('hex')
  posts[id] = { id, post }

  try {
    await axios.post('http://localhost:3035/api/events', {
      type: 'postCreated',
      data: { id, post }
    })
  } catch (error) {
    console.log(error)
  }

  response.send(posts)
})

app.post('/api/events', (request, response) => {
  const event = request.body
  console.log(event)
  response.send({})
})

app.get('/api/posts', (request, response) => {
  response.send(posts)
})

app.listen(PORT, () => {
  console.log(`server listening on post ${PORT}`)
})


