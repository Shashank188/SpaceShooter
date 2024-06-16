<script setup>
import { onMounted, ref, reactive } from 'vue';
import { Ship } from '@/composables/spaceShip'
import { Laser } from '@/composables/laser'
import { Obstacle } from '@/composables/obstacle'



let gamePlay = ref();
const state = reactive({
    context: null,
    lasers: [],
    obstacles: [],
    tick: 0,
    enemySeedFrameInterval: 100
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
        x: gamePlay.value.width / 2, y: gamePlay.value.height - 100, context: state.context, stage: gamePlay.value
    });
    state.spaceShip.draw();
}

function render(delta) {
    //spaceship
    let xPos = state.spaceShip.x;
    if (state.spaceShip.left)
        xPos = xPos -= 30;
    else if (state.spaceShip.right)
        xPos = xPos += 30;

    // stage boundaries

    if (xPos < 0)
        xPos = 0;
    else if (xPos > gamePlay.value.width - 80)
        xPos = gamePlay.value.width - 80;


    // laser 
    if (state.spaceShip.shooting) {
        let laser = new Laser({
            color: 'white',
            x: state.spaceShip.x,
            context: state.context,
            y: gamePlay.value.height - 100,
        });
        state.lasers.push(laser);

    }






    if (state.lasers.length) {
        for (let laser of state.lasers) {
            laser.update(laser.y -= 10);
            laser.draw();
        }
    }

    if (state.obstacles.length) {
        for (let obstacle of state.obstacles) {
            // enemy.update(enemy.x, enemy.y += enemy.speed * speedMultiplier);
            obstacle.update(obstacle.x, obstacle.y += obstacle.speed);
            obstacle.draw();

        }
    }

    state.spaceShip.update(xPos);
    state.spaceShip.draw();
    // drawLasers();
    // seed new enemies
    if (state.tick % state.enemySeedFrameInterval === 0) {
        const obstacle = new Obstacle({ y: 0, context: state.context, stage: gamePlay.value });
        state.obstacles.push(obstacle);
        //   console.log({enemySeedFrameInterval, speedMultiplier})
    }


    // create lasers, if shooting



    // handleShipCollision();
    // handleLaserCollision();

    // drawEnemies();

    // enemyCleanup();
    // laserCleanup();

    // if (ship.shooting) laserTick++;
    state.tick++;


    if (state.obstacles.length) {
        state.obstacles = state.obstacles.filter(asteroid => {
            let visible = asteroid.y < gamePlay.value.height;
            // let active = enemy.active === true;
            // return visible && active;
            return visible;
        });
    }

    state.lasers = state.lasers.filter(laser => {
        let visible = laser.y > -laser.height;
        // let active = laser.active === true;
        // return visible && active;
        return visible;
    });

    requestAnimationFrame(render);
}



</script>
<template>
    <canvas id="gameplay" ref="gamePlay" class="gameplay"></canvas>
</template>