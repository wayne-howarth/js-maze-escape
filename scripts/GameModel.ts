class GameModel implements ICharacterModelListener {
    private _width: number;
    private _height: number;
    private _score: number;
    private _generator: IMazeGenerator;
    private _listener: IGameModelListener;
    private _maze: Maze;
    private _hero: CharacterModel;

    constructor(width: number, height: number, generator: IMazeGenerator) {
        this._width = width;
        this._height = height;
        this._score = 0;
        this._generator = generator;

        this._maze = generator.generateMaze();
    }

    getScore(): number {
        return this._score;
    }

    registerListener(listener: IGameModelListener) {
        this._listener = listener;

        this._listener.setMazeDimensions(this._width, this._height);
        this._hero = listener.createHeroCharacter();
        this._hero?.registerListener(this);
        listener.draw(this._hero);
    }

    newGame() {
        this._score = 0;
        this._maze = this._generator.generateMaze();
    }

    moveforward() {
        this._hero?.moveForward();
    }

    turnRight() {
        this._hero?.turnRight();
        this._listener?.turnRight();
    }

    turnLeft() {
        this._hero?.turnLeft();
        this._listener?.turnLeft();
    }

    canMove(direction: Direction, x: number, y: number): boolean {
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

    moved(character: CharacterModel) {
        this._listener?.draw(character);
    }
}