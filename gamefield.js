function GameField(settings) {

    this.settings = settings;
    this.matrix = null;
    this.snake = null;

    var MIN_POINTS_FOR_FOOD = 1;
    var TIMER_INITIAL_VAL = 1000;
    var self = this;
    var pressedKey;
    var moveInterval;
    var foodExpireTimeOut;
    var foodPositions = [];
    var prevMove = {};
    var started = false;

    var foodCoordinates = [{
        x: "0",
        y: "-60",
        points: 1,
        timer: -1
    }, {
        x: "-19",
        y: "-19",
        points: 2,
        timer: 10000
    }, {
        x: "-19",
        y: "-60",
        points: 3,
        timer: 8000
    }, {
        x: "-38",
        y: "-59",
        points: 5,
        timer: 7000
    }, {
        x: "-112",
        y: "0",
        points: 7,
        timer: 5000
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
        moveInterval = setInterval(reassignTimer, TIMER_INITIAL_VAL);
    };

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
            clearInterval(foodExpireTimeOut);
            var points = MIN_POINTS_FOR_FOOD;
            if (foodPositions[0] && foodPositions[0].foodType) {
                points = foodPositions[0].foodType.points;
            }
            stats.scoreUp(points);
            stats.lengthUp();
            createNewFoodRandomly();
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
        return createFoodObject(cellPosition);
    };

    function createFoodObject(cell) {
        stats.setFoodCount();
        cell.isEaten = false;
        cell.foodType = chooseFoodFromArray();
        foodPositions.unshift(cell);
        deleteExpiredFood(cell);
        console.log("New food location: X:" + cell.x + " Y: " + cell.y + " Food Type: "+ cell.foodType.points);
        return cell;
    };

    function deleteExpiredFood(cell) {
        if (cell.foodType && cell.foodType.timer && cell.foodType.timer > 0) {
            foodExpireTimeOut = setTimeout(function() {
                stats.scoreDown();
                foodPositions[0].isExpired = true;
                matrix.redrawFood(foodPositions);
                var food = foodPositions.pop();
                console.log("Delete expired: X: " + food.x + " Y: " + food.y + " Food Type: "+ food.foodType.points);
                createNewFoodRandomly();
            }, cell.foodType.timer);
        }
    };

    function chooseFoodFromArray() {
        return foodCoordinates[Math.floor(Math.random() * foodCoordinates.length)];
    };

    function gameEnd() {
        dispose();
        alert("End");
        setTimeout(self.initialize, 2000);
    };

    function dispose() {
        document.onkeydown = null;
        clearInterval(moveInterval);
        clearInterval(foodExpireTimeOut);
        pressedKey = null;
        foodPositions = [];
        prevMove = {};
        started = false;
        settings.toggleSettings(false);
        self.stats = null;
        self.snake = null;
        self.matrix = null;
        $("#matrix").html("");
    };

    var reassignTimer = function() {
        clearInterval(moveInterval);
        onKeyDown(pressedKey);
        moveInterval = setInterval(reassignTimer, 
            TIMER_INITIAL_VAL * (100 - (Math.round(stats.getLength() / 10) * 10)) / 100);
        stats.setSpeed();
    };

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
