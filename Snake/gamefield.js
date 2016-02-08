function GameField(settings) {

    this.settings = settings;
    this.matrix = null;
    this.snake = null;
    var MIN_POINTS_FOR_FOOD = 1;
    var self = this;
    var pressedKey;
    var interval;
    var foodPositions = [];
    var prevMove = {};
    var started = false;
    
    var foodCoordinates = [{
        x: "0",
        y: "-60",
        points: 1,
        timer: 10
    }, {
        x: "-19",
        y: "-19",
        points: 2,
        timer: 7
    }, {
        x: "-19",
        y: "-60",
        points: 3,
        timer: 5
    }, {
        x: "-38",
        y: "-59",
        points: 5,
        timer: 4
    }, {
        x: "-112",
        y: "0",
        points: 7,
        timer: 3
    }];

    var KEY_CODE = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
    };

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
            validateFood(newHead);
            matrix.redrawFood(foodPositions);
            snake.tryAddEatenFoodAsTail(foodPositions);
            prevMove = coordinates;
        }
    };

    function validateFood(newHead) {

        if (snake.checkFoodWasEaten(newHead, foodPositions)) {
            var points = MIN_POINTS_FOR_FOOD;
            if (foodPositions[0] && foodPositions[0].foodType) {
                points = foodPositions[0].foodType.points;
            }
            stats.scoreUp(points);
            stats.lengthUp();
            createNewFoodRandomly();
        }
    }

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
        cellPosition.foodType = chooseFoodFromArray();
        foodPositions.unshift(cellPosition);
        console.log("New food location: X:" + cellPosition.x + " Y: " + cellPosition.y);
        return cellPosition;
    };

    function chooseFoodFromArray() {
        return foodCoordinates[Math.floor(Math.random() * foodCoordinates.length)];
    }

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
        e.preventDefault();
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
