const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios')

const PORT = 3031

const comments = {}

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/:id/comments', async (request, response) => {
  const { comment } = request.body
  const postId = request.params.id
  console.log(`postId`, request.path)
  const id = randomBytes(8).toString('hex')
  comments[id] = { postId, id, comment, status: 'pending' }

  try {
    await axios.post('http://localhost:3035/api/events', {
      type: 'commentCreated',
      data: { postId, id, comment, status: 'pending' }
    })
  } catch (error) {
    console.log(error)
  }

  response.send(comments)
})


app.post('/api/events', async(request, response) => {
  const event = request.body
  const { type, data } = event
  console.log(event)

  if (type === 'commentModerated') {
    const { postId, id, comment, status } = data

    try {
      await axios.post('http://localhost:3035/api/events', {
        type: 'commentUpdated',
        data: { postId, id, comment, status }
      })
    } catch (error) {
      console.log(error)
    }
  }

  response.send({})
})

app.get('/api/comments', (request, response) => {
  response.send(comments)
})

app.listen(PORT, () => {
  console.log(`server listening on post ${PORT}`)
})


