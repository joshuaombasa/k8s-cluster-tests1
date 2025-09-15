const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PORT = 3035;

// Store events in memory
const events = {};

const app = express();

app.use(express.json());
app.use(cors());

// Handle incoming events
app.post('/api/events', async (req, res) => {
  const event = req.body;
  console.log('Received event:', event);

  const services = [
    'http://localhost:3034/api/events',
    'http://localhost:3030/api/events',
    'http://localhost
