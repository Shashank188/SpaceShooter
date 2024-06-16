<script setup>
import { useGameStore } from '@/stores/game';

const { state: gameState } = useGameStore();
const emits = defineEmits(['on-play'])

const props = defineProps(['lastScore'])


</script>
<template>
    <section class="startgame-container">
        <h1 class="startgame-container__header">Space Shooter</h1>
        <div class="startgame-container__ins">Use left, right Arrow and Spacebar to Play</div>
        <div v-if="props.lastScore" class="startgame-container__ins">Last Score: {{ props.lastScore }}</div>


        <button class="startgame-container__button" @click.stop="emits('on-play', 'start')">Start New Game</button>
        <!-- <button class="startgame-container__button" @click.stop="emits('on-play', 'continue')">Continue</button> -->
    </section>
</template>
