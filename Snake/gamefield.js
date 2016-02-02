function GameField(settings) {

    this.settings = settings;
    this.matrix = null;
    this.snake = null;

    var KEY_CODE = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    }
    var pressedKey;

    this.initialize = function initialize() {
        matrix = new Matrix(settings.getFieldSize());
        snake = new Snake(settings, matrix);
        snake.initialize();
    }

    var onKeyPress = function onKeyPress(e) {
        e = e || window.event;
        pressedKey = e;
        switch (e.keyCode) {
            case KEY_CODE.ARROW_UP:
                snake.updateCoordinates({
                    x: 0,
                    y: -1
                });
                break
            case KEY_CODE.ARROW_DOWN:
                snake.updateCoordinates({
                    x: 0,
                    y: 1
                });
                break
            case KEY_CODE.ARROW_RIGHT:
                snake.updateCoordinates({
                    x: 1,
                    y: 0
                });
                break
            case KEY_CODE.ARROW_LEFT:
                snake.updateCoordinates({
                    x: -1,
                    y: 0
                });
                break
            default:
                break
        }
    };
     document.onkeypress = onKeyPress;
    setInterval(function() {
        onKeyPress(pressedKey)
    }, 1000);
}