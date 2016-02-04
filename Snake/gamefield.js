function GameField(settings) {

    this.settings = settings;
    this.matrix = null;
    this.snake = null;

    var self = this;
    var pressedKey;
    var interval;
    var foodPositions = [];
    var prevMove = {};
    var started = false;
    var KEY_CODE = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    }

    this.initialize = function initialize() {
        stats = new GameStatistics();
        matrix = new Matrix(settings.getFieldSize());
        snake = new Snake(settings, matrix);
        updateCoordinates(settings.getStartPosition());
        document.onkeydown = onKeyDown;
        interval = setInterval(function() {
            onKeyDown(pressedKey)
        }, 1500);
    }

    function updateCoordinates(coordinates) {
        var newHead = null;
        if (!snake.checkReverseMove(prevMove, coordinates) && (newHead = snake.tryGetNewHeadPosition(coordinates))) {
            if (snake.hasSnakeAteItself(newHead)) {
                gameEnd();
                return;
            }
            if (snake.checkFoodWasEaten(newHead, foodPositions)) {
                stats.scoreUp();
                stats.lengthUp();
                createNewFoodRandomly();
            }
            matrix.redrawFood(foodPositions);
            snake.tryAddEatenFoodAsTail(foodPositions);
            prevMove = coordinates;
        }
    };

    function createNewFoodRandomly() {
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

    function gameEnd() {
        dispose();
        alert("End");
        setTimeout(self.initialize, 2000);
    }

    function dispose() {
        document.onkeydown = null;
        clearInterval(interval);
        pressedKey = null;
        interval = 0;
        foodPositions = [];
        prevMove = {};
        started = false;
        settings.toggleSettings(false);
        self.stats = null;
        self.snake = null;
        self.matrix = null;
        $("#matrix").html("");
    }

    var onKeyDown = function onKeyDown(e) {
        e = e || window.event;

        if (!e)
            return

        if (!started) {
            settings.toggleSettings(true);
            started = true;
        }

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
}
