const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')

const axios = require('axios')

const PORT = 3033

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/events', async (request, response) => {
  const event = request.body
  const { type, data } = event
  console.log(event)

  if (type === 'commentCreated') {
    const { postId, id, comment, status } = data
    const moderatedStatus = comment.includes('sex') ? 'rejected' : 'approved'

    try {
      await axios.post('http://localhost:3035/api/events', {
        type: 'commentModerated',
        data: { postId, id, comment, status: moderatedStatus }
      })
    } catch (error) {
      console.log(error)
    }
  }

  response.send({})

})

app.listen(PORT, () => {
  console.log(`server listening on post ${PORT}`)
})


