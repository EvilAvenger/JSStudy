function GameField(settings) {

    this.settings = settings;
    this.matrix = null;
    this.snake = null;

    var foodPositions = [];
    var prevMove = {};
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
        updateCoordinates(settings.getStartPosition());
    }

    var updateCoordinates = function updateCoordinates(coordinates) {
        var newHead = null;
        if (!snake.checkReverseMove(prevMove, coordinates) && (newHead = snake.tryGetNewHeadPosition(coordinates))) {
            if (snake.hasSnakeAteItself(newHead)) {
                gameEnd();
            }
            if (snake.checkFoodWasEaten(newHead, foodPositions)) {
                createNewFoodRandomly();
            }
            matrix.redrawFood(foodPositions);
            snake.tryAddEatenFoodAsTail(foodPositions);
            prevMove = coordinates;
        }
    };

    var createNewFoodRandomly = function createNewFoodRandomly() {
        var cellPosition = matrix.getRandomCell();
        var snakePositions = snake.getSnakePositions();
        for (var i = 0; i < snakePositions.length; i++) {
            if (cellPosition.compareObjectCoordinates(snakePositions[i])) {
                cellPosition = matrix.getRandomCell();
                i = 0;
                continue;
            }
        }
        cellPosition.isEaten = false;
        foodPositions.unshift(cellPosition);
        console.log("New food location: X:" + cellPosition.x + " Y: " + cellPosition.y);
        return cellPosition;
    };

    var gameEnd = function gameEng() {
        alert("End");
    }

    var onKeyDown = function onKeyDown(e) {
        e = e || window.event;
        pressedKey = e;
        switch (e.keyCode) {
            case KEY_CODE.ARROW_UP:
                updateCoordinates(settings.MOVE.UP);
                break
            case KEY_CODE.ARROW_DOWN:
                updateCoordinates(settings.MOVE.DOWN);
                break
            case KEY_CODE.ARROW_RIGHT:
                updateCoordinates(settings.MOVE.RIGHT);
                break
            case KEY_CODE.ARROW_LEFT:
                updateCoordinates(settings.MOVE.LEFT);
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
