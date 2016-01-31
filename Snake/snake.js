function Snake(settings, matrix) {
    this.matrix = matrix;
    this.snakeSize = settings.getSnakeSize();
    this.gameMode = settings.getGameMode();
    var self = this;
    var foodPosition;
    var snakePositions = [];

    this.initialize = function initialize() {
        var startPosition = {
            x: 0,
            y: 0
        };
        this.addBlocktoSnake(startPosition);

    };

    this.addBlocktoSnake = function addBlocktoSnake(block) {
        if (block) {
            snakePositions.push(block);
            matrix.redraw(snakePositions);
            console.log("Block added to snake. X:" + block.x + " Y:" + block.y);
        }
    };

    this.updateCoordinates = function updateCoordinates(coordinates) {
        if (coordinates && validateBounds(coordinates)) {
            matrix.redraw(snakePositions);
            checkFood(snakePositions[0]);
        }
    };

    var validateBounds = function validateBounds(coordinates) {
        isValid = true;
        var tempPositions = snakePositions;

        for (var i = 0; i < snakePositions.length; i++) {
            var x = snakePositions[i].x + coordinates.x;
            var y = snakePositions[i].y + coordinates.y;
            if (x >= matrix.matrixSize || y >= matrix.matrixSize || x < 0 || y < 0) {

                if (self.gameMode == GAME_MODE.NO_BOUNDS) {
                    x < 0 ? x = matrix.matrixSize -1 : x;
                    x == matrix.matrixSize ? x = 0 : x;
                    y < 0 ? y = matrix.matrixSize -1 : y;
                    y == matrix.matrixSize ? y = 0 : y;
                } else if (gameMode == GAME_MODE.DEATH_BOUNDS) {
                    positions = {};
                    //matrix.gameEnd();
                    break;
                } else {
                    isValid = false;
                    snakePositions = tempPositions;
                    break;
                }
            }

            snakePositions[i].x = x;
            snakePositions[i].y = y;
            console.log("New coordinates: X: " + snakePositions[i].x + " Y: " + snakePositions[i].y);
        }
        return isValid;
    }


    var checkFood = function checkFood(coordinates) {
        var food = foodPosition; // вопрос! if не работает без присваивания значения локальной переменной. почему?
        if (!food || compareObjectCoordinates(coordinates, foodPosition)) {
            foodPosition = alocateFoodOnField();
            console.log("New food location: X:" + foodPosition.x + " Y: " + foodPosition.y);
        } else {
            matrix.addCellToMatrix(foodPosition, GAME_CLASSES.FOOD);
        }
    };

    var alocateFoodOnField = function alocateFoodOnField() {
        var cellPosition = matrix.getRandomCell();

        for (var i = 0; i < snakePositions.length; i++) {
            if (compareObjectCoordinates(snakePositions[i], cellPosition)) {
                cellPosition = matrix.getRandomCell();
                i = 0;
                continue;
            }
        }
        matrix.addCellToMatrix(cellPosition, GAME_CLASSES.FOOD);
        return cellPosition;
    };

    var compareObjectCoordinates = function compareObjectCoordinates(objectA, objectB) {
        return objectA.x == objectB.x && objectA.y == objectB.y;
    }
}