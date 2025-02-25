<template>
    <div class="game-list">
      <div
        v-for="game in games"
        :key="game.id"
        class="game-card"
        @click="$emit('game-selected', game.id)"
      >
        
        <p>{{ game.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      games: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .game-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .game-card {
    width: 150px;
    cursor: pointer;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    transition: transform 0.2s;
  }
  
  .game-card:hover {
    transform: scale(1.05);
  }
  
  .game-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .game-card p {
    margin-top: 10px;
    font-size: 1rem;
  }
  </style>