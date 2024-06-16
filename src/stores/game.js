import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {


  let state = reactive({
    speed: 10,
    score: 0,
    lives: 5,
    position: 50,
    rate: 1
  })

  function updateSpeed(speed) {
    state.speed = speed;
  }

  function updateState(newState) {
    state = newState;
  }

  return { state, updateSpeed, updateState }
})
