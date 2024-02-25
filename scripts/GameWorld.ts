class GameWorld implements IGameModelListener {
    canvas: Element;

    constructor(gameCanvas: Element) {
        this.canvas = gameCanvas;
    }

    setMazeDimensions(width: number, height: number) {
        
    }

    public createHeroCharacter(): CharacterModel {
        return null;
    }
    
    draw(character: CharacterModel) {
        
    }

    turnRight() {
        
    }

    turnLeft() {
        
    }

    private clearMaze() {

    }

    private drawMaze() {

    }

    private centreCoordinates(cell: Coordinates): CanvasCoordinates {
        return null;
    }

}