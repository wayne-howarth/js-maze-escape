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
class MazeGeneratorImpl {
    generateMaze() {
        return new Maze(20, 20);
    }
}
//# sourceMappingURL=Maze.js.map