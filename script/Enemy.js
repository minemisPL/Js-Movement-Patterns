export class Enemy {
    frame = 0
    frameNumber = 0

    constructor(image, framesQuantity, staggerFrames, initialX, initialY, width, height, scale, speedModifier) {
        this._staggerFrames = staggerFrames
        this._image = image
        this._scale = scale
        this._framesQuanitity = framesQuantity
        this._positionX = initialX
        this._positionY = initialY
        this._width = width
        this._height = height
        this._speedModifier = speedModifier
    }

    move(vectorX, vectorY) {
        this._positionX += vectorX * this.speedModifier
        this._positionY += vectorY * this.speedModifier
    }

    setPosition(x, y) {
        this._positionX = x
        this._positionY = y
    }

    moveRandom(distance) {
        const randomX = Math.random() * distance * 2 - distance
        const randomY = Math.random() * distance * 2 - distance

        this.move(randomX, randomY);
    }

    getFrameX() {
        if (this.frame === this._staggerFrames) {
            this.frameNumber++;
            this.frame = 0;
        }

        if (this.frameNumber >= this._framesQuanitity) {
            this.frameNumber = 0;
        }

        return this.spriteWidth * this.frameNumber
    }

    nextFrame() {
        this.frame++
    }

    get positionX() {
        return this._positionX
    }

    get positionY() {
        return this._positionY
    }

    get spriteWidth() {
        return this._width
    }

    get spriteHeight() {
        return this._height
    }

    get scaledWidth() {
        return this.spriteWidth * this.scale
    }

    get scaledHeight() {
        return this.spriteHeight * this.scale
    }

    get speedModifier() {
        return this._speedModifier
    }

    get image() {
        return this._image
    }

    get scale() {
        return this._scale;
    }
}