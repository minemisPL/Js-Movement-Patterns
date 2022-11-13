/** @type {HTMLCanvasElement} */
import {config} from "./data.js";
import {Enemy} from "./Enemy.js";
import {enemiesData} from "./data.js";

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

canvas.style.height = config.canvasHeight + "px"
canvas.width = config.canvasWidth
canvas.height = config.canvasHeight

const enemies = [];

for (let i = 0; i < 20; i++) {
    const speed = Math.random() * 3 + 1
    const scale = Math.random() * 0.5 + 0.2
    const enemyData = enemiesData[1]

    enemies.push(new Enemy(
        enemyData.image,
        enemyData.framesQuantity,
        3,
        Math.random() * (config.canvasWidth- enemyData.spriteWidth * scale),
        Math.random() * (config.canvasHeight- enemyData.spriteHeight * scale),
        enemyData.spriteWidth,
        enemyData.spriteHeight,
        scale,
        speed
    ))
}

const drawEnemy = (enemy, config, animationType) => {
    function correctPositionIdleBat(enemy) {
        const rightEdgeXPosition = enemy.positionX + enemy.scaledWidth
        const downEdgeYPosition = enemy.positionY + enemy.scaledHeight

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

    function correctPositionFlyingBat(enemy) {

        if (enemy.positionX < -enemy.scaledWidth) {
            enemy.setPosition(config.canvasWidth, enemy.positionY)
        }

        if (enemy.positionY < -enemy.scaledHeight) {
            enemy.setPosition(enemy.positionX, config.canvasHeight)
        }

        if (enemy.positionX > config.canvasWidth + 1) {
            enemy.setPosition(-enemy.scaledWidth, enemy.positionY)
        }

        if (enemy.positionY > config.canvasHeight + 1) {
            enemy.setPosition(enemy.positionX, -enemy.scaledHeight)
        }
    }

    switch (animationType) {
        case "idleBat": correctPositionIdleBat(enemy); break;
        case "flyingBat": correctPositionFlyingBat(enemy); break;
    }

    if (animationType === "idleBat") {
        correctPositionIdleBat(enemy)
    }

    ctx.drawImage(
        enemy.image, enemy.getFrameX(), 0, enemy.spriteWidth, enemy.spriteHeight,
        enemy.positionX, enemy.positionY, enemy.scaledWidth, enemy.scaledHeight)
}

let frame = 0

const animate = () => {
    ctx.clearRect(0,0, config.canvasWidth, config.canvasHeight);

    const distance = 5

    enemies.forEach(enemy => {
        if (frame % 3 === 0) {
            enemy.move(-distance, 0)
        }
        drawEnemy(enemy, config, "flyingBat")
        enemy.nextFrame()
    })

    frame++
    // window.setTimeout(() => {
    //     ctx.clearRect(0,0, config.canvasWidth, config.canvasHeight);
    //     enemy1.moveRandom(distance)
    //     drawEnemy(enemy1, config)
    //     window.requestAnimationFrame(animate);
    // }, 1)


    window.requestAnimationFrame(animate);
}


animate();
