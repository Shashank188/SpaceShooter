<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useGameStore } from '@/stores/game';

const state = reactive({
    context: null,
    stars: []
})

const { state: gameState } = useGameStore();


onMounted(() => {
    createBackground();
    createAnimation();

})

const backgroundCanvas = ref(null);


function createBackground() {
    const dpi = window.devicePixelRatio || 1;
    backgroundCanvas.value.width = backgroundCanvas.value.offsetWidth * dpi;
    backgroundCanvas.value.height = backgroundCanvas.value.offsetHeight * dpi;

    state.context = backgroundCanvas.value.getContext('2d');
    const { height, width } = backgroundCanvas.value;
    state.context.scale(dpi, dpi);

    state.context.fillRect(0, 0, width, height);
}

function createAnimation() {
    for (var i = 0; i < 60; i++) {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        state.stars.push(new Stars(x, y, gameState.speed));


    }

    function render() {
        requestAnimationFrame(render);
        state.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0; i < state.stars.length; i++) {
            state.stars[i].update();
        }
    }
    render();
}


function Stars(x, y, speed) {
    this.x = x;
    this.y = y;
    this.h = 10
    this.speed = speed;
    this.draw = function () {
        state.context.fillStyle = 'white';
        state.context.fillRect(this.x, this.y, 1, 5);
    }
    this.update = function () {
        this.y += this.speed;

        if (this.y >= window.innerHeight) {
            this.y = -this.h;
            this.x = Math.floor(Math.random() * window.innerWidth);
        }
        this.draw();
    }
}
</script>
<template>
    <canvas id="background-canvas" ref="backgroundCanvas" class="background-canvas"></canvas>
</template>