/** @type {HTMLCanvasElement} */
import {config} from "./data.js";
import {Enemy} from "./Enemy.js";
import {enemiesData} from "./data.js";

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

canvas.width = config.canvasWidth
canvas.height = config.canvasHeight

const enemies = [];

for (let i = 0; i < 50; i++) {
    const enemyWidth = Math.random() * 150 + 50
    const speed = Math.random() * 2 + 1

    //Math.random() * (config.canvasWidth - enemyWidth),
    //         Math.random() * (config.canvasHeight- enemyWidth),
    //         enemyWidth,
    //         enemyWidth,
    //         speed

    enemies.push(new Enemy(

    ))
}

const drawEnemy = (enemy, config) => {
    function correctPosition(enemy) {
        const rightEdgeXPosition = enemy.positionX + enemy.width
        const downEdgeYPosition = enemy.positionY + enemy.height

        if (enemy.positionX < 0) {
            const correction = -enemy.positionX
            enemy.move(correction, 0)
        }

        if (enemy.positionY < 0) {
            const correction = -enemy.positionY
            enemy.move(0, correction)
        }

        if (rightEdgeXPosition > config.canvasWidth) {
            const correction = config.canvasWidth - rightEdgeXPosition
            enemy.move(correction, 0)
        }

        if (downEdgeYPosition > config.canvasHeight) {
            const correction = config.canvasHeight - downEdgeYPosition
            enemy.move(0, correction)
        }
    }

    correctPosition(enemy)

    ctx.drawImage(
        enemy.image, enemy.getFrameX(), 0, enemy.width, enemy.height,
        enemy.positionX, enemy.positionY, enemy.width, enemy.height)
}

const enemyData = enemiesData[0];

const enemy = new Enemy(
    enemyData.image, enemyData.framesQuantity, 3,
    100, 100,
    enemyData.spriteWidth, enemyData.spriteHeight,
    1, 1)

let frame = 0

const animate = () => {
    ctx.clearRect(0,0, config.canvasWidth, config.canvasHeight);

    const distance = 10

    //enemy1.moveRandom(distance)
    //drawEnemy(enemy1, config)

    drawEnemy(enemy, config)

    if (frame % 4 === 0) {
        enemy.moveRandom(distance)
    }

    enemy.nextFrame()
    frame++
    // enemies.forEach(enemy => {
    //     enemy.moveRandom(distance)
    //     drawEnemy(enemy, config)
    // })

    // window.setTimeout(() => {
    //     ctx.clearRect(0,0, config.canvasWidth, config.canvasHeight);
    //     enemy1.moveRandom(distance)
    //     drawEnemy(enemy1, config)
    //     window.requestAnimationFrame(animate);
    // }, 1)


    window.requestAnimationFrame(animate);
}


animate();
