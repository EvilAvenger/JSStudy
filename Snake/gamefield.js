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

    var onKeyDown = function onKeyDown(e) {
        e = e || window.event;
        pressedKey = e;
        switch (e.keyCode) {
            case KEY_CODE.ARROW_UP:
                snake.updateCoordinates(settings.MOVE.UP);
                break
            case KEY_CODE.ARROW_DOWN:
                snake.updateCoordinates(settings.MOVE.DOWN);
                break
            case KEY_CODE.ARROW_RIGHT:
                snake.updateCoordinates(settings.MOVE.RIGHT);
                break
            case KEY_CODE.ARROW_LEFT:
                snake.updateCoordinates(settings.MOVE.LEFT);
                break
            default:
                break
        }
    };
     document.onkeydown = onKeyDown;
    // setInterval(function() {
    //     onKeyPress(pressedKey)
    // }, 3000);
}
