<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/game';


const { state: gameState } = useGameStore();

const lives = computed(() => gameState.lives)

</script>
<template>
    <div class="score-card-container">
        <span> Score: {{ gameState.score }}</span>
        <span> Lives: {{ lives }}</span>
    </div>
</template>
