class CharacterModel {
    constructor(x, y) {
        this._positionX = x;
        this._positionY = y;
        this._facing = Direction.North;
    }
    registerListener(listener) {
        this._listener = listener;
    }
    moveForward() {
        var _a, _b;
        if (!((_a = this._listener) === null || _a === void 0 ? void 0 : _a.canMove(this._facing, this._positionX, this._positionY)))
            return;
        switch (this._facing) {
            case Direction.North:
                this._positionY++;
            case Direction.South:
                this._positionY--;
            case Direction.East:
                this._positionX++;
            case Direction.West:
                this._positionX--;
        }
        (_b = this._listener) === null || _b === void 0 ? void 0 : _b.moved(this);
    }
    turnRight() {
        switch (this._facing) {
            case Direction.North:
                this._facing = Direction.East;
            case Direction.South:
                this._facing = Direction.West;
            case Direction.East:
                this._facing = Direction.South;
            case Direction.West:
                this._facing = Direction.North;
        }
    }
    turnLeft() {
        switch (this._facing) {
            case Direction.North:
                this._facing = Direction.West;
            case Direction.South:
                this._facing = Direction.East;
            case Direction.East:
                this._facing = Direction.North;
            case Direction.West:
                this._facing = Direction.South;
        }
    }
}
//# sourceMappingURL=CharacterModel.js.map