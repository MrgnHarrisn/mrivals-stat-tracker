<template>
  <div id="app">
    <!-- NavBar -->
    <NavBar @search="fetchPlayerData" />

    <!-- Player Profile -->
    <div v-if="player" class="player-profile">
      <h2>Player Found</h2>
      <p><strong>Name:</strong> {{ player.name }}</p>
      <p><strong>ID:</strong> {{ player.id }}</p>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading">Loading...</div>
  </div>
</template>

<script>
import apiClient from "./api"; // Import the configured Axios instance
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },
  data() {
    return {
      player: null, // Stores the fetched player data
      errorMessage: "", // Stores any error messages
      isLoading: false, // Tracks loading state
    };
  },
  methods: {
    async fetchPlayerData(playerName) {
      this.isLoading = true; // Start loading
      try {
        const response = await apiClient.get(`/player-id/${playerName}`);
        console.log("Full API Response:", response); // Log the full response
        this.player = response.data;
      } catch (error) {
        console.error("Error fetching player data:", error);

        if (error.response) {
          // Server responded with a status code other than 2xx
          console.error("Response Data:", error.response.data);
          console.error("Response Status:", error.response.status);
          console.error("Response Headers:", error.response.headers);
        } else if (error.request) {
          // No response received from the server
          console.error("No response received:", error.request);
        } else {
          // Something else went wrong
          console.error("Error Message:", error.message);
        }

        if (error.response && error.response.status === 404) {
          this.errorMessage = "Player not found.";
        } else {
          this.errorMessage = "An error occurred while fetching player data.";
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

.player-profile {
  padding: 20px;
  text-align: left;
  border: 1px solid #ddd;
  margin: 20px;
  border-radius: 8px;
}

.error-message {
  color: red;
  text-align: center;
  margin: 20px;
}

.loading {
  text-align: center;
  margin: 20px;
  color: blue;
}
</style>
