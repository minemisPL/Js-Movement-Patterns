import {Enemy} from "./Enemy.js";

export function createEnemies (config, quantity, enemyData, angleSpeed, curve, angleOffset, curveOffset) {
    const enemies = [];

    angleSpeed = correctIfUndefined(angleSpeed)
    curve = correctIfUndefined(curve)
    angleOffset = correctIfUndefined(angleOffset)
    curveOffset = correctIfUndefined(curveOffset)


    for (let i = 0; i < quantity; i++) {
        const speed = Math.random() * 1.5 + 1
        const scale = Math.random() * 0.5 + 0.2

        enemies.push(new Enemy(
            enemyData.image,
            enemyData.framesQuantity,
            3,
            Math.random() * (config.canvasWidth- enemyData.spriteWidth * scale),
            Math.random() * (config.canvasHeight- enemyData.spriteHeight * scale),
            enemyData.spriteWidth,
            enemyData.spriteHeight,
            scale,
            speed,
            Math.random() * angleSpeed + angleOffset,
            Math.random() * curve + curveOffset,
            Math.floor(Math.random() * 200 + 50)
        ))
    }

    return enemies
}

const correctIfUndefined = (variable) => {
    if (variable === undefined) {
        return 0
    }

    return variable
}