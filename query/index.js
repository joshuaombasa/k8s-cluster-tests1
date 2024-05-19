const express = require('express')
const cors = require('cors')


const axios = require('axios')

const PORT = 3034

const posts = {}

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/events', (request, response) => {
  const event = request.body
  console.log(event)

  const { type, data } = event

  if (type === 'postCreated') {
    const { id, post } = data
    posts[id] = { postId: id, post, comments: [] }
  }

  if (type === 'commentCreated') {
    const { postId, id, comment, status } = data
    const commentsToUpdate = posts[postId].comments || []
    commentsToUpdate.push({ postId, id, comment, status })
  }

  if (type === 'commentUpdated') {
    const { postId, id, comment, status } = data
    const commentsToUpdate = posts[postId].comments || []
    const commentToUpdate = commentsToUpdate.find(comment => comment.id === id)
    commentToUpdate.status = status
    commentToUpdate.comment = comment
  }

  response.send({})
})

app.get('/api/posts', (request, response) => {
  response.send(posts)
})

app.listen(PORT, () => {
  console.log(`server listening on post ${PORT}`)
})


