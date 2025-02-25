const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit'); // Import rate-limiting middleware
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Environment variables
const API_BASE_URL = 'https://mrapi.org/api';
const API_KEY = process.env.API_KEY; // Load API key from .env

if (!API_KEY) {
  console.error('API_KEY is missing. Please set it in the .env file.');
  process.exit(1); // Exit if API key is not set
}

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 2, // Limit each IP to 2 requests per windowMs
  message: 'Too many requests. Please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all requests
app.use(limiter);

// Proxy endpoint for fetching player data
app.get('/api/player-id/:playerName', async (req, res) => {
  const { playerName } = req.params;

  try {
    // Make a request to the external API
    const response = await axios.get(`${API_BASE_URL}/player-id/${playerName}`, {
      headers: {
        'X-API-Key': API_KEY,
      },
    });

    // Forward the API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player data:', error.message);

    if (error.response) {
      // Forward the error status and message from the API
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      // Handle other errors (e.g., network issues)
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});