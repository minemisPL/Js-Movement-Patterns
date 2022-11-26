/** @type {HTMLCanvasElement} */
import {config} from "./data.js";
import {enemiesData} from "./data.js";
import {buttonInit, canvasConfig, enemyInit, toggleButtonsInit, xDividerInit, yDividerInit} from "./initConfig.js";
import {animate} from "./animationHandler.js";
import {animationInit} from "./animations.js";
import {createEnemies} from "./enemyCreator.js";

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const idleBtn = document.getElementById("idleBatBtn")
const flyingBtn = document.getElementById("flyingBatBtn")
const ghostBtn = document.getElementById("ghostBtn")
const razorBtn = document.getElementById("razorBallBtn")

const toggleXBtn = document.getElementById("toggleX")
const toggleYBtn = document.getElementById("toggleY")

const xDividerInput = document.getElementById("xDivider")
const yDividerInput = document.getElementById("yDivider")

const changeAnimationButtons = [
    {
        id: "IDLE_BAT",
        button: idleBtn,
    },
    {
        id: "FLYING_BAT",
        button: flyingBtn,
    },
    {
        id: "GHOST",
        button: ghostBtn,
    },
    {
        id: "RAZOR_BALL",
        button: razorBtn,
    },
]

const enemyGroups = [
    {
        id: "IDLE_BAT",
        enemyGroup: createEnemies(config, 20, enemiesData[0])
    },
    {
        id: "FLYING_BAT",
        enemyGroup: createEnemies(config,20, enemiesData[1], 0.2, 5)
    },
    {
        id: "GHOST",
        enemyGroup: createEnemies(config,20, enemiesData[2], 2, 150, 0.5, 50)
    },
    {
        id: "RAZOR_BALL",
        enemyGroup: createEnemies(config,20, enemiesData[3])
    },
]

canvasConfig(canvas, config)
buttonInit(changeAnimationButtons)
enemyInit(enemyGroups)
animationInit()
toggleButtonsInit(toggleXBtn, toggleYBtn)
xDividerInit(xDividerInput)
yDividerInit(yDividerInput)

animate(ctx, config);
