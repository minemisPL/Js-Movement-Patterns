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