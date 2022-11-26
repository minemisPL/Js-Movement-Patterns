import {animationController} from "./animationHandler.js";
import {ghostController} from "./GhostController.js";

export const drawFlyingBat = (ctx, bat, config, frame) => {
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

    function moveFlyingBat(bat, frame) {
        bat.move(-3, bat.curve * Math.sin(bat.angle))
    }

    drawEnemy(ctx, bat, config, frame, moveFlyingBat, correctPositionFlyingBat)
}

export const drawIdleBat = (ctx, bat, config, frame) => {
    function correctPositionIdleBat(enemy, config) {
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

    function moveIdleBat(bat, frame) {
        if (frame % 4 === 0) {
            bat.moveRandom(3)
        }
    }

    drawEnemy(ctx, bat, config, frame, moveIdleBat, correctPositionIdleBat)
}

export const drawGhost = (ctx, ghost, config, frame) => {
    function correctPositionGhost(enemy, config) {}

    function moveGhost(ghost, frame) {
        if (frame % 4 === 0) {
            const xDivider = ghostController.xDivider
            const yDivider = ghostController.yDivider
            const isXSine = ghostController.xSine
            const isYSine = ghostController.ySine


            const x = config.canvasWidth / 2 * sinOrCos(isXSine,ghost.angle * Math.PI / xDivider)
                + config.canvasWidth / 2
                - ghost.scaledWidth / 2

            const y = config.canvasHeight / 2 * sinOrCos(isYSine,ghost.angle * Math.PI / yDivider)
                + config.canvasHeight / 2
                - ghost.scaledHeight / 2

            ghost.setPosition(x, y)
        }
    }


    drawEnemy(ctx, ghost, config, frame, moveGhost, correctPositionGhost)
}

const sinOrCos = (isSine, x) => {
    if (isSine) {
        return Math.sin(x)
    }

    return Math.cos(x)
}

export const drawRazorBall = (ctx, razorBall, config, frame) => {
    function correctPositionRazorBall(enemy, config) {}

    function moveRazorBall(razorBall, frame) {
        if (frame % razorBall.interval === 0) {
            razorBall.approachingX = Math.random() * (config.canvasWidth - razorBall.scaledWidth)
            razorBall.approachingY = Math.random() * (config.canvasHeight - razorBall.scaledHeight)
        }

        const xDifference = razorBall.positionX - razorBall.approachingX
        const yDifference = razorBall.positionY - razorBall.approachingY

        razorBall.move(-xDifference / 50, -yDifference / 50)
    }

    drawEnemy(ctx, razorBall, config, frame, moveRazorBall, correctPositionRazorBall)
}

const drawEnemy = (ctx, enemy, config, frame, move, correction) => {
    move(enemy, frame)
    correction(enemy, config)

    ctx.drawImage(
        enemy.image, enemy.getFrameX(), 0, enemy.spriteWidth, enemy.spriteHeight,
        enemy.positionX, enemy.positionY, enemy.scaledWidth, enemy.scaledHeight)

    enemy.nextFrame()
    animationController.nextFrame()
}

export const animationInit = () => {
    animationController.addAnimation(drawIdleBat, "IDLE_BAT")
    animationController.addAnimation(drawFlyingBat, "FLYING_BAT")
    animationController.addAnimation(drawGhost, "GHOST")
    animationController.addAnimation(drawRazorBall, "RAZOR_BALL")
}