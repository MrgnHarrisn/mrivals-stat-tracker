<template>
  <nav class="navbar">
    <div class="logo">Marvel Rivals Tracker</div>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for players..."
        @keyup.enter="performSearch"
      />
      <button @click="performSearch">Search</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Stores the player name entered by the user
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        // Emit the search query to the parent component
        this.$emit('search', this.searchQuery.trim());
      } else {
        alert('Please enter a player name.');
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.search-container {
  display: flex;
  gap: 10px;
}

input {
  padding: 5px;
  border: none;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>