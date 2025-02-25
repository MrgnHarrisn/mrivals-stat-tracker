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

/**
 * Fetches the player ID based on the player name.
 */
async function getPlayerId(playerName) {
  try {
    const response = await axios.get(`${API_BASE_URL}/player-id/${playerName}`, {
      headers: {
        'X-API-Key': API_KEY,
      },
    });
    return response.data.id; // Assuming the API returns an object with an `id` field
  } catch (error) {
    console.error('Error fetching player ID:', error.message);
    throw new Error('Failed to fetch player ID.');
  }
}

/**
 * Fetches all pages of match data for a given player ID.
 */
async function getPlayerMatches(playerId) {
  let page = 1;
  let allData = [];

  while (true) {
    try {
      const response = await axios.get(`${API_BASE_URL}/player-match/${playerId}`, {
        headers: {
          'X-API-Key': API_KEY,
        },
        params: { page }, // Pagination parameter
      });

      const data = response.data;
      if (!data.length) break; // Stop if no more matches are returned

      allData = [...allData, ...data];
      page++;
    } catch (error) {
      console.error('Error fetching player matches:', error.message);
      throw new Error('Failed to fetch player matches.');
    }
  }

  return allData;
}

/**
 * Endpoint to fetch player matches by player name.
 */
app.get('/api/player-matches/:playerName', async (req, res) => {
  const { playerName } = req.params;

  try {
    // Step 1: Fetch the player ID
    const playerId = await getPlayerId(playerName);

    // Step 2: Fetch all match data for the player
    const matches = await getPlayerMatches(playerId);

    // Return the match data to the frontend
    res.json(matches);
  } catch (error) {
    console.error('Error processing request:', error.message);

    if (error.message === 'Failed to fetch player ID.') {
      res.status(404).json({ error: 'Player not found.' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});