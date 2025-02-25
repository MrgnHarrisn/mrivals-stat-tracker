<template>
  <div id="app">
    <!-- Navbar -->
    <NavBar @search="fetchPlayerMatches" />

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading">Loading...</div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Match List -->
    <div v-if="matches.length" class="match-list">
      <h2>Match History</h2>
      <GameList :matches="matches" />
    </div>
  </div>
</template>

<script>
import api from './api';
import NavBar from './components/NavBar.vue';
import GameList from './components/GameList.vue';

export default {
  components: { NavBar, GameList },
  data() {
    return {
      matches: [], // Stores the fetched match data
      errorMessage: '', // Stores any error messages
      isLoading: false, // Tracks loading state
    };
  },
  methods: {
    async fetchPlayerMatches(playerName) {
      this.isLoading = true; // Start loading
      try {
        // Reset previous data and errors
        this.matches = [];
        this.errorMessage = '';

        // Fetch player matches from the backend
        const response = await api.getPlayerMatches(playerName);
        this.matches = response.data;

        console.log('Fetched Matches:', this.matches);
      } catch (error) {
        console.error('Error fetching player matches:', error);

        if (error.response && error.response.status === 404) {
          this.errorMessage = 'Player not found.';
        } else {
          this.errorMessage = 'An error occurred while fetching match data.';
        }
      } finally {
        this.isLoading = false; // Stop loading
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.loading {
  text-align: center;
  margin: 20px;
  color: blue;
}

.error-message {
  color: red;
  text-align: center;
  margin: 20px;
}

.match-list {
  padding: 20px;
}
</style>