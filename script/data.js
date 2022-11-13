export const config = {
    canvasWidth: 450,
    canvasHeight: 900,

    staggerFrames: 4,
}

const getProperImage = (src) => {
    const image = new Image()
    image.src = src
    return image;
}

export const enemiesData = [
    {
        name: "IdleBat",
        image: getProperImage('media/enemy1.png'),
        framesQuantity: 6,
        spriteWidth: 293,
        spriteHeight: 155,
    },
    {
        name: "FlyingBat",
        image: getProperImage('media/enemy2.png'),
        framesQuantity: 6,
        spriteWidth: 266,
        spriteHeight: 188,
    },
    {
        name: "Ghost",
        image: getProperImage('media/enemy3.png'),
        framesQuantity: 6,
        spriteWidth: 218,
        spriteHeight: 177,
    },
    {
        name: "RazorBall",
        image: getProperImage('media/enemy4.png'),
        framesQuantity: 9,
        spriteWidth: 213,
        spriteHeight: 212,
    },
]