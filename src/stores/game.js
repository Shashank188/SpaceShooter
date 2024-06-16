import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {


  let state = reactive({
    speedMultiplier: 1,
    score: 0,
    lives: 3,
    position: 50,
    rate: 1
  })

  function updateSpeed(speed) {
    state.speedMultiplier = speed;
  }

  function updateScore(score) {
    state.score = score;
  }
  function updateLives(lives) {
    state.lives = lives;
  }
  function resetGame() {
    state.score = 0;
    state.lives = 3;
    state.speed = 10
  }

  return { state, updateSpeed, updateLives, updateScore, resetGame }
})
