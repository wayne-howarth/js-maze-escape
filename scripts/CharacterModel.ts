class CharacterModel {
    private _positionX: number;
    private _positionY: number;
    private _facing: Direction;
    private _listener: ICharacterModelListener;


    constructor(x: number, y: number) {
        this._positionX = x;
        this._positionY = y;
        this._facing = Direction.North;
    }

    registerListener(listener: ICharacterModelListener) {
        this._listener = listener;
    }

    moveForward() {
        if (!this._listener?.canMove(this._facing, this._positionX, this._positionY))
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

        this._listener?.moved(this);
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