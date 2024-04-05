class GameWorld implements IGameModelListener {
    private canvas: HTMLCanvasElement;
    private sprites: Sprites;
    private width: number;
    private height: number;
    private cellWidth: number;
    private cellHeight: number;

    constructor(gameCanvas: HTMLCanvasElement, sprites: Sprites) {
        this.canvas = gameCanvas;
        this.sprites = sprites;
    }

    setMazeDimensions(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cellWidth = this.canvas.clientWidth / width;
        this.cellHeight = this.canvas.clientHeight / height;
    }

    draw(character: CharacterModel) {
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(this.sprites.getSprite(0), 50, 50)
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