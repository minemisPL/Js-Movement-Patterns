/** @type {HTMLCanvasElement} */
import {config} from "./data.js";
import {Enemy} from "./Enemy.js";
import {enemiesData} from "./data.js";
import {buttonInit, canvasConfig, enemyInit} from "./initConfig.js";
import {animate, animationInit} from "./animation.js";

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const idleBtn = document.getElementById("idleBatBtn")
const flyingBtn = document.getElementById("flyingBatBtn")
const ghostBtn = document.getElementById("ghostBtn")
const razorBtn = document.getElementById("razorBallBtn")

const createEnemies = (quantity, enemyData) => {
    const enemies = [];

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
            speed
        ))
    }

    return enemies
}

const buttons = [
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
        enemyGroup: createEnemies(20, enemiesData[0])
    },
    {
        id: "FLYING_BAT",
        enemyGroup: createEnemies(20, enemiesData[1])
    },
    {
        id: "GHOST",
        enemyGroup: createEnemies(20, enemiesData[2])
    },
    {
        id: "RAZOR_BALL",
        enemyGroup: createEnemies(20, enemiesData[3])
    },
]

canvasConfig(canvas, config)
buttonInit(buttons)
enemyInit(enemyGroups)
animationInit()

animate(ctx, config);
