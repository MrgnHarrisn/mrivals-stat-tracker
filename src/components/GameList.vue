<template>
    <div class="game-list">
      <div v-for="(match, index) in matches" :key="index" class="match-card">
        <p><strong>Match ID:</strong> {{ match.match_uid }}</p>
        <p><strong>Game Mode:</strong> {{ match.gamemode.name }}</p>
        <p><strong>Result:</strong> {{ match.stats.is_win ? 'Winner' : 'Loser' }}</p>
        <p><strong>KDA:</strong> {{ match.stats.kills }}/{{ match.stats.deaths }}/{{ match.stats.assists }}</p>
        <p><strong>Duration:</strong> {{ match.match_duration.minutes }}:{{match.match_duration.seconds}}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      matches: {
        type: Array,
        required: true,
      },
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format date as "MM/DD/YYYY"
      },
    },
  };
  </script>
  
  <style scoped>
  .game-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .match-card {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .match-card p {
    margin: 5px 0;
  }
  </style>