<script setup>
import { onMounted, ref, reactive } from 'vue';
import { Ship } from '@/composables/spaceShip'
import { Laser } from '@/composables/laser'
import { Obstacle } from '@/composables/obstacle'

import { useGameStore } from '@/stores/game';



const { updateLives, updateScore, updateSpeed, state: gameState } = useGameStore();
let gamePlay = ref();
const state = reactive({
    context: null,
    lasers: [],
    obstacles: [],
    tick: 0,
    laserTick: 0,
    enemySeedFrameInterval: 100,
    explosionSound: new Audio('explosion.mp3')

})



onMounted(() => {
    initCanvas();
    initSpaceShip();
    render();
})

function initCanvas() {
    const dpi = window.devicePixelRatio || 1;
    gamePlay.value.width = gamePlay.value.offsetWidth * dpi;
    gamePlay.value.height = gamePlay.value.offsetHeight * dpi;

    state.context = gamePlay.value.getContext('2d');
    state.context.scale(dpi, dpi);
}
function initSpaceShip() {
    state.spaceShip = new Ship({
        x: window.innerWidth / 2, y: window.innerHeight - 100, context: state.context,
        stage: gamePlay.value,
        laserTickReset: () => state.laserTick = 0
    });
    state.spaceShip.draw();
}

function moveSpaceShip() {
    let xPos = state.spaceShip.x;
    if (state.spaceShip.left)
        xPos = xPos -= 30;
    else if (state.spaceShip.right)
        xPos = xPos += 30;


    if (xPos < 0)
        xPos = 0;
    else if (xPos > window.innerWidth - 80)
        xPos = window.innerWidth - 80;


    if (state.spaceShip.active) {
        state.spaceShip.update(xPos);
        state.spaceShip.draw();
    }

}

function drawLasers() {
    if (state.spaceShip.shooting && state.spaceShip.active) {
        if (state.laserTick === 0 || state.laserTick % 10 === 0) {
            let laser = new Laser({
                color: 'white',
                x: state.spaceShip.x,
                context: state.context,
                y: window.innerHeight - 100,
            });
            state.lasers.push(laser);
        }
    }

    for (let laser of state.lasers) {
        if (laser.active && state.spaceShip.active) {
            laser.update(laser.y -= 10);
            laser.draw();
        }
    }
}

function addObstacle() {
    if (state.tick % state.enemySeedFrameInterval === 0) {
        const obstacle = new Obstacle({ y: 0, context: state.context, stage: gamePlay.value, speed: gameState.speedMultiplier * 10 });
        state.obstacles.push(obstacle);
    }
    for (let obstacle of state.obstacles) {
        if (obstacle.active) {
            obstacle.update(obstacle.x, obstacle.y += obstacle.speed);
            obstacle.draw();
        }
    }
}
function render() {

    if (!state.obstacles.length) state.spaceShip.render()

    addObstacle();
    moveSpaceShip();
    drawLasers();
    handleShipCollision();
    handleLaserCollision();


    if (state.spaceShip.shooting) state.laserTick++;
    state.tick++;


    if (state.obstacles.length) {
        state.obstacles = state.obstacles.filter(obstacle => {
            let visible = obstacle.y < window.innerHeight;
            let active = obstacle.active === true;
            return visible && active;
        });
    }

    state.lasers = state.lasers.filter(laser => {
        let visible = laser.y > -laser.height;
        let active = laser.active === true;
        return visible && active;
    });

    requestAnimationFrame(render);
}

function handleShipCollision() {
    if (state.obstacles.length) {
        for (let obstacle of state.obstacles) {
            let collision = hitTest(state.spaceShip, obstacle);
            if (collision && state.spaceShip.active) {
                state.spaceShip.active = false;
                state.spaceShip.explode();
                state.explosionSound.play();
                setTimeout(() => {
                    updateSpeed(1);
                    state.spaceShip.active = true;
                    updateLives(gameState.lives - 1)

                }, 500);
            }
        }
    }
}

function handleLaserCollision() {
    for (let enemy of state.obstacles) {
        for (let laser of state.lasers) {
            let collision = hitTest(laser, enemy);
            if (collision && laser.active) {
                enemy.active = false;
                state.lasers = []
                updateScore(gameState.score + 100)
                enemy.explode();
                state.explosionSound.play();
                updateSpeed(gameState.speedMultiplier * 1.1)
            }
        }
    }
}

function hitTest(item1, item2) {
    let collision = true;
    if (
        item1.x > item2.x + item2.width ||
        item1.y > item2.y + item2.height ||
        item2.x > item1.x + item1.width ||
        item2.y > item1.y + item1.height
    ) {
        collision = false;
    }
    return collision;
}




</script>
<template>
    <canvas id="gameplay" ref="gamePlay" class="gameplay"></canvas>
</template>