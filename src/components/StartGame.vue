<script setup>

const emits = defineEmits(['on-play'])

</script>
<template>
    <section class="startgame-container">
        <h1 class="startgame-container__header">Space Shooter</h1>
        <button class="startgame-container__button" @click.stop="emits('on-play', 'start')">Start New Game</button>
        <button class="startgame-container__button" @click.stop="emits('on-play', 'continue')">Continue</button>
    </section>
</template>
