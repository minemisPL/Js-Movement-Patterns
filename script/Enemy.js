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
        this._width = width * scale
        this._height = height * scale
        this._speedModifier = speedModifier
    }

    move(vectorX, vectorY) {
        this._positionX += vectorX
        this._positionY += vectorY
    }

    moveRandom(distance) {
        const realDistance = distance * this.speedModifier * this._scale

        const randomX = Math.random() * realDistance * 2 - realDistance
        const randomY = Math.random() * realDistance * 2 - realDistance

        this.move(randomX, randomY);
    }

    getFrameX() {
        if (this.frame % this._staggerFrames === 0) {
            this.frameNumber = this.frame % this._framesQuanitity
        }

        return this.width * this.frameNumber
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

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    get speedModifier() {
        return this._speedModifier
    }

    get image() {
        return this._image
    }
}