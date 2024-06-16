<script setup>
import BackGround from '@/components/BackGround.vue';
import StartGame from '@/components/StartGame.vue';
import GamePlay from '@/components/GamePlay.vue';
import ScoreCard from '@/components/ScoreCard.vue';



import { reactive, watch } from 'vue';
import { useGameStore } from '@/stores/game';


const { state: gameState, resetGame } = useGameStore();
const state = reactive({
  isStartGame: true,
  lastScore: 0
})


function onPlay() {
  state.isStartGame = false;
}

watch(() => gameState.lives, () => {
  if (!gameState.lives) {
    state.isStartGame = true;
    state.lastScore = gameState.score;
    resetGame();
  }
});


</script>

<template>
  <main>
    <BackGround />
    <div class="game-container">
      <StartGame @on-play="onPlay" v-if="state.isStartGame" :lastScore="state.lastScore" />
      <GamePlay v-else></GamePlay>
      <ScoreCard v-if="!state.isStartGame"></ScoreCard>
    </div>
  </main>
</template>
