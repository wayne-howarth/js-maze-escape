interface IGameModelListener {
    setMazeDimensions(width: number, height: number);
    createHeroCharacter(): CharacterModel;
    draw(character: CharacterModel);
    turnRight();
    turnLeft();
}

interface ICharacterModelListener {
    canMove(direction: Direction, x: number, y: number): boolean;
    moved(character: CharacterModel);
} 

interface IGameWorldListener {
    moved(position: Coordinates);
}

interface IMazeGenerator {
    generateMaze(): Maze;
}

type Coordinates = [number, number];
type CanvasCoordinates = [number, number];
type CanvasSize = [number, number];