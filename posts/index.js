const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const PORT = process.env.PORT || 3030;
const EVENT_BUS_URL = process.env.EVENT_BUS_URL || 'http://localhost:3035/api/events';

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

// Create a new post
app.post('/api/posts', async (req, res) => {
  const { post } = req.body;

  if (!post || typeof post !== 'string') {
    return res.status(400).json({ error: 'Post content is required and must be a string.' });
  }

  const id = randomBytes(8).toString('hex');
  const newPost = { id, post };
  posts[id] = newPost;

  try {
    await axios.post(EVENT_BUS_URL, {
      type: 'PostCreated',
      data: newPost
    });
  } catch (error) {
    console.error('Error sending event to Event Bus:', error.message);
  }

  res.status(201).json(newPost);
});

// Handle incoming events
app.post('/api/events', (req, res) => {
  const event = req.body;
  console.log('Received Event:', event.type);
  res.sendStatus(200);
});

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
