import {enemyManager} from "./EnemyManager.js";

class AnimationController {
    constructor(initialAnimation) {
        this._currentAnimationId = initialAnimation
        this._animationList = []
        this._currentFrame = 0
    }

    addAnimation(animation, id) {
        this._animationList.push({
            animation: animation,
            id: id
        })
    }

    getAnimation(id) {
        let foundAnimation = null

        this._animationList.forEach(animationObj => {
            if (animationObj.id === id) {
                foundAnimation = animationObj.animation
                return
            }
        })

        return foundAnimation
    }

    nextFrame() {
        this._currentFrame++
    }

    get currentFrame() {
        return this._currentFrame
    }

    get currentAnimationId() {
        return this._currentAnimationId
    }

    set currentAnimationId(animationId) {
        this._currentAnimationId = animationId
    }
}

export const animationController = new AnimationController("IDLE_BAT")

export const animate = (ctx, config) => {
    ctx.clearRect(0,0, config.canvasWidth, config.canvasHeight)

    const animationId = animationController.currentAnimationId
    const frame = animationController.currentFrame

    const enemies = enemyManager.getEnemyGroup(animationId)
    const animation = animationController.getAnimation(animationId)

    enemies.forEach(enemy => {
        animation(ctx, enemy, config, frame)
    })

    window.requestAnimationFrame(() => {
        animate(ctx, config)
    });
}

const drawFlyingBat = (ctx, bat, config, frame) => {
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
        if (frame % 3 === 0) {
            bat.move(-4, 0)
        }
    }

    drawEnemy(ctx, bat, config, frame, moveFlyingBat, correctPositionFlyingBat)
}

const drawIdleBat = (ctx, bat, config, frame) => {
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

const drawEnemy = (ctx, enemy, config, frame, move, correction) => {
    move(enemy, frame)
    correction(enemy, config)

    ctx.drawImage(
        enemy.image, enemy.getFrameX(), 0, enemy.spriteWidth, enemy.spriteHeight,
        enemy.positionX, enemy.positionY, enemy.scaledWidth, enemy.scaledHeight)

    enemy.nextFrame()
}

export const animationInit = () => {
    animationController.addAnimation(drawIdleBat, "IDLE_BAT")
    animationController.addAnimation(drawFlyingBat, "FLYING_BAT")
}