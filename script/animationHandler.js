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
        const animationObj = this._animationList.find(animationObj => animationObj.id === id)

        if (animationObj == null) {
            throw new Error("No such animation")
        }

        return animationObj.animation
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