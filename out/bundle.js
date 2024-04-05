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
var Direction;
(function (Direction) {
    Direction[Direction["None"] = 0] = "None";
    Direction[Direction["North"] = 1] = "North";
    Direction[Direction["East"] = 2] = "East";
    Direction[Direction["South"] = 4] = "South";
    Direction[Direction["West"] = 8] = "West";
})(Direction || (Direction = {}));
class GameModel {
    constructor(generator) {
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
        this._listener.setMazeDimensions(this._maze.width(), this._maze.height());
        this._hero = new CharacterModel(this._maze.width() / 2, 0);
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
class GameWorld {
    constructor(gameCanvas, sprites) {
        this.canvas = gameCanvas;
        this.sprites = sprites;
    }
    setMazeDimensions(width, height) {
        this.width = width;
        this.height = height;
        this.cellWidth = this.canvas.clientWidth / width;
        this.cellHeight = this.canvas.clientHeight / height;
    }
    draw(character) {
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.sprites.getSprite(0), 50, 50);
    }
    turnRight() {
    }
    turnLeft() {
    }
    clearMaze() {
    }
    drawMaze() {
    }
    centreCoordinates(cell) {
        return null;
    }
}
class Maze {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._walls = [];
        for (var i = 0; i < height; i++) {
            this._walls[i] = [];
            for (var j = 0; j < width; j++) {
                this._walls[i][j] = Direction.None;
            }
        }
        for (var i = 0; i < width; i++) {
            this.makeWall(i, 0, Direction.South);
            this.makeWall(i, height - 1, Direction.North);
        }
        for (var j = 0; j < height; j++) {
            this.makeWall(0, j, Direction.West);
            this.makeWall(width - 1, j, Direction.East);
        }
    }
    width() {
        return this._width;
    }
    height() {
        return this._height;
    }
    canMoveNorth(x, y) {
        return !this.isWallAt(x, y, Direction.North);
    }
    canMoveSouth(x, y) {
        return !this.isWallAt(x, y, Direction.South);
    }
    canMoveEast(x, y) {
        return !this.isWallAt(x, y, Direction.East);
    }
    canMoveWest(x, y) {
        return !this.isWallAt(x, y, Direction.West);
    }
    isWallAt(x, y, direction) {
        if (x < 0 || x > this._width - 1 || y < 0 || y > this._height - 1)
            return false;
        return (this._walls[y][x] & direction) !== 0;
    }
    makeWall(x, y, edge) {
        if (x < 0 || x > this._width - 1 || y < 0 || y > this._height - 1 || edge === Direction.None)
            return;
        this._walls[y][x] = this._walls[y][x] | edge;
        if (edge === Direction.North && y < this._height - 1)
            this._walls[y + 1][x] = this._walls[y + 1][x] | this.opposite(edge);
        if (edge === Direction.South && y > 0)
            this._walls[y - 1][x] = this._walls[y - 1][x] | this.opposite(edge);
        if (edge === Direction.East && x < this._width - 1)
            this._walls[y][x + 1] = this._walls[y][x + 1] | this.opposite(edge);
        if (edge === Direction.West && x > 0)
            this._walls[y][x - 1] = this._walls[y][x - 1] | this.opposite(edge);
    }
    opposite(edge) {
        var _opposite = {
            [Direction.None]: Direction.None,
            [Direction.North]: Direction.South,
            [Direction.South]: Direction.North,
            [Direction.East]: Direction.West,
            [Direction.West]: Direction.East
        };
        return _opposite[edge];
    }
}
class MazeGenerator {
    init(width, height) {
        this._width = width;
        this._height = height;
    }
    generateMaze() {
        let maze = new Maze(this._width, this._height);
        return maze;
    }
}
class Sprites {
    constructor(filename) {
        let image = new Image();
        image.onload = () => {
            Promise.all([
                createImageBitmap(image, 0, 0, 20, 27),
                createImageBitmap(image, 20, 0, 20, 27),
                createImageBitmap(image, 40, 0, 20, 27)
            ])
                .then(sprites => {
                this._sprites = sprites;
            });
        };
        image.src = filename;
    }
    getSprite(index) {
        return this._sprites[index];
    }
}
Sprites.HERO = 0;
//# sourceMappingURL=bundle.js.map