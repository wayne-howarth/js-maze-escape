class MazeGenerator implements IMazeGenerator {
    private _width: number;
    private _height: number;

    public init(width: number, height: number) {
		this._width = width;
		this._height = height;
	}
    
    generateMaze(): Maze {
        let maze = new Maze(this._width, this._height);
        return maze;
    }
}