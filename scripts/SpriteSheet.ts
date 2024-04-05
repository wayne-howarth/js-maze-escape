class Sprites {
    public static HERO: number = 0;

    private _sprites: ImageBitmap[];

    constructor(filename: string) {
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

    getSprite(index: number) {
        return this._sprites[index];
    }
}