class GameModel {
    constructor(width, height, generator) {
        this._width = width;
        this._height = height;
        this._score = 0;
        this._generator = generator;
        this._maze = generator.generateMaze();
    }
    getScore() {
        return this._score;
    }
    registerListener(listener) {
        var _a;
        this._listener = listener;
        this._listener.setMazeDimensions(this._width, this._height);
        this._hero = listener.createHeroCharacter();
        (_a = this._hero) === null || _a === void 0 ? void 0 : _a.registerListener(this);
        listener.draw(this._hero);
    }
    newGame() {
        this._score = 0;
        this._maze = this._generator.generateMaze();
    }
    moveforward() {
        var _a;
        (_a = this._hero) === null || _a === void 0 ? void 0 : _a.moveForward();
    }
    turnRight() {
        var _a, _b;
        (_a = this._hero) === null || _a === void 0 ? void 0 : _a.turnRight();
        (_b = this._listener) === null || _b === void 0 ? void 0 : _b.turnRight();
    }
    turnLeft() {
        var _a, _b;
        (_a = this._hero) === null || _a === void 0 ? void 0 : _a.turnLeft();
        (_b = this._listener) === null || _b === void 0 ? void 0 : _b.turnLeft();
    }
    canMove(direction, x, y) {
        switch (direction) {
            case Direction.North:
                return this._maze.canMoveNorth(x, y);
            case Direction.South:
                return this._maze.canMoveSouth(x, y);
            case Direction.East:
                return this._maze.canMoveEast(x, y);
            case Direction.West:
                return this._maze.canMoveWest(x, y);
            case Direction.None:
                return false;
        }
    }
    moved(character) {
        var _a;
        (_a = this._listener) === null || _a === void 0 ? void 0 : _a.draw(character);
    }
}
//# sourceMappingURL=GameModel.js.map