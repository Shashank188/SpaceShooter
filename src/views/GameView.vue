<script setup>
import BackGround from '@/components/BackGround.vue';
import StartGame from '@/components/StartGame.vue';
import GamePlay from '@/components/GamePlay.vue';


import { useGameStore } from '@/stores/game';
import { reactive } from 'vue';

const { state: gameState, updateState } = useGameStore();

const state = reactive({
  isStartGame: true
})


function onPlay(action) {
  if (action === 'continue') {
    const lastSavedState = localStorage.getItem('saved-game');
    updateState(lastSavedState);
  }
  state.isStartGame = false;
}


</script>

<template>
  <main>
    <BackGround />
    <div class="game-container">
      <StartGame @on-play="onPlay" v-if="state.isStartGame" />
      <GamePlay v-else></GamePlay>
    </div>
  </main>
</template>
