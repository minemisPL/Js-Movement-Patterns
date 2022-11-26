import {animationController} from "./animationHandler.js";
import {enemyManager} from "./EnemyManager.js";
import {ghostController} from "./GhostController.js";

export const buttonInit = (buttonData) => {

    buttonData.forEach(buttonObj => {
        buttonObj.button.addEventListener("click", () => {
            removeClass(buttonData, "chosen")

            buttonObj.button.classList.add("chosen")

            const ghostControlDiv =  document.getElementById("ghostControls")

            if (buttonObj.id === "GHOST") {
                ghostControlDiv.classList.remove("invisible")
            } else {
                ghostControlDiv.classList.add("invisible")
            }

            animationController.currentAnimationId = buttonObj.id
        })
    })
}

export const canvasConfig = (canvas, config) => {
    canvas.style.height = config.canvasHeight + "px"
    canvas.style.width = config.canvasWidth + "px"
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

export const toggleButtonsInit = (toggleXBtn, toggleYBtn) => {
    toggleXBtn.addEventListener("click", () => {
        ghostController.toggleXSine()
        if (toggleXBtn.value.includes("Cosine")) {
            toggleXBtn.value = "Toggle X: Sine"
        } else {
            toggleXBtn.value = "Toggle X: Cosine"
        }
    })

    toggleYBtn.addEventListener("click", () => {
        ghostController.toggleYSine()
        if (toggleYBtn.value.includes("Cosine")) {
            toggleYBtn.value = "Toggle Y: Sine"
        } else {
            toggleYBtn.value = "Toggle Y: Cosine"
        }
    })
}

export const xDividerInit = (xDividerInput) => {
    xDividerInput.addEventListener("change", () => {
        ghostController.xDivider = xDividerInput.value
    })
}

export const yDividerInit = (yDividerInput) => {
    yDividerInput.addEventListener("change", () => {
        ghostController.yDivider = yDividerInput.value
    })
}

