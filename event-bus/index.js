const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios')

const PORT = 3035

const events = {}

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/events', async (request, response) => {
  const event = request.body
  console.log(event)


  try {
    await axios.post('http://localhost:3034/api/events',event)
    await axios.post('http://localhost:3030/api/events',event)
    await axios.post('http://localhost:3031/api/events',event)
    await axios.post('http://localhost:3033/api/events',event)
  } catch (error) {
    console.log(error)
  }

  response.send({})
})

app.get('/api/events', (request, response) => {
  response.send(events)
})



app.listen(PORT, () => {
  console.log(`server listening on post ${PORT}`)
})


