class GhostController {
    constructor() {
        this._xSine = true
        this._ySine = false
        this._xDivider = 180
        this._yDivider = 180
    }

    get xSine() {
        return this._xSine
    }

    get ySine() {
        return this._ySine
    }

    toggleXSine() {
        this._xSine = !this._xSine
    }

     toggleYSine() {
        this._ySine = !this._ySine
    }

    get xDivider() {
        return this._xDivider;
    }

    set xDivider(value) {
        this._xDivider = value;
    }

    get yDivider() {
        return this._yDivider;
    }

    set yDivider(value) {
        this._yDivider = value;
    }
}

export const ghostController = new GhostController()