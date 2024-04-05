class Maze {
    private _width: number;
    private _height: number;
    private _walls: Direction[][];

    constructor(width: number, height: number) {
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

    width(): number {
        return this._width;
    }

    height(): number {
        return this._height;
    }

    canMoveNorth(x: number, y: number): boolean {
        return !this.isWallAt(x, y, Direction.North);
    }

    canMoveSouth(x: number, y: number): boolean {
        return !this.isWallAt(x, y, Direction.South);
    }

    canMoveEast(x: number, y: number): boolean {
        return !this.isWallAt(x, y, Direction.East);
    }

    canMoveWest(x: number, y: number): boolean {
        return !this.isWallAt(x, y, Direction.West);
    }

    isWallAt(x: number, y: number, direction: Direction): boolean {
        if (x < 0 || x > this._width - 1 || y < 0 || y > this._height - 1)
            return false;

        return (this._walls[y][x] & direction) !== 0;
    }

    makeWall(x: number, y: number, edge: Direction) {
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

    private opposite(edge: Direction): Direction {
        var _opposite: Record<Direction, Direction> = {
            [Direction.None]: Direction.None,
            [Direction.North]: Direction.South,
            [Direction.South]: Direction.North,
            [Direction.East]: Direction.West,
            [Direction.West]: Direction.East
        };

        return _opposite[edge];
    }
}