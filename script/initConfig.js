import {animationController} from "./animation.js";
import {enemyManager} from "./EnemyManager.js";

export const buttonInit = (buttonData) => {

    buttonData.forEach(buttonObj => {
        buttonObj.button.addEventListener("click", () => {
            removeClass(buttonData, "chosen")

            buttonObj.button.classList.add("chosen")

            animationController.currentAnimationId = buttonObj.id
        })
    })
}

export const canvasConfig = (canvas, config) => {
    canvas.style.height = config.canvasHeight + "px"
    canvas.width = config.canvasWidth
    canvas.height = config.canvasHeight
}

export const enemyInit = (enemyGroups) => {
    enemyGroups.forEach(group => {
        enemyManager.addEnemyGroup(group.id, group.enemyGroup)
    })
}

const removeClass = (buttons, className) => {
    buttons.forEach(buttonObj => {
        buttonObj.button.classList.remove(className)
    })
}