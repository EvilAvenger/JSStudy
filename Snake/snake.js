function Snake(settings, matrix) {

    this.matrix = matrix;
    this.snakeSize = settings.getSnakeSize();
    this.gameMode = settings.getGameMode();

    var self = this;
    var prevMove = {};
    var foodPositions = [];
    var snakePositions = [];

    this.initialize = function initialize(startPosition) {
        this.updateCoordinates(settings.getStartPosition());
    };

    this.addBlocktoSnake = function addBlocktoSnake(block, isTail) {
        if (block) {
            if (!isTail) {
                snakePositions.unshift(block);
            } else {
                snakePositions.push(block);
            }
            console.log("Block added to snake. X:" + block.x + " Y:" + block.y);
        }
        return block;
    };

    this.updateCoordinates = function updateCoordinates(coordinates) {
        var newHead = null;
        if (!checkReverseMove(prevMove, coordinates) && (newHead = tryGetNewHeadPosition(coordinates))) {
            hasSnakeAteItself(newHead);
            checkFoodWasEaten(newHead);
            updateSnake();
            matrix.redrawFood(foodPositions);
            var newTail = tryAddEatenFoodAsTail(getSnakesTailBlock());
            prevMove = coordinates;
        }
    };

    var hasSnakeAteItself = function hasSnakeAteItself(newHead) {
        var isAte = false;
        for(var i = 1; i < snakePositions.length; i++) {
            if (compareObjectCoordinates(newHead, snakePositions[i])) {
                isAte = true;
                break;
            }
        }
        return isAte;
    }

    var checkReverseMove = function checkReverseMove(prevMove, coordinates) {
        isReverse = false;
        if (prevMove && coordinates) {
            isReverse = !compareObjectCoordinates(prevMove, coordinates) && compareObjectAbsCoordinates(prevMove, coordinates);
        }
        return isReverse;
    }

    var tryGetNewHeadPosition = function tryGetNewHeadPosition(coordinates) {
        var position = {};
        if (coordinates) {
            var snakesHead = getSnakesHeadBlock() || coordinates;
            position.x = coordinates.x + snakesHead.x;
            position.y = coordinates.y + snakesHead.y;
            position = self.addBlocktoSnake(validateBounds(position), false);
        }
        return position;
    }

    var validateBounds = function validateBounds(head) {
        if (head.x >= matrix.matrixSize || head.y >= matrix.matrixSize || head.x < 0 || head.y < 0) {
            if (self.gameMode == GAME_MODE.NO_BOUNDS) {

                head.x < 0 ? head.x = matrix.matrixSize - 1 : head.x;
                head.x == matrix.matrixSize ? head.x = 0 : head.x;
                head.y < 0 ? head.y = matrix.matrixSize - 1 : head.y;
                head.y == matrix.matrixSize ? head.y = 0 : head.y;

            } else if (self.gameMode == GAME_MODE.DEATH_BOUNDS) {
                head = null;
            } else {
                head = false;
            }
        }
        return head;
    }
    var updateSnake = function updateSnake() {
        matrix.redrawSnake(snakePositions);
        if (snakePositions.length > 1) {
            snakePositions.pop();
        }
    }
    var checkFoodWasEaten = function checkFoodWasEaten(snakesHead) {
        var food = foodPositions && foodPositions[0];
        var foodEaten = false;

        if (!food) {
            createNewFoodRandomly();
        }
        if (food && (foodEaten = compareObjectCoordinates(snakesHead, food))) {
            markAsEatenFood(foodPositions);
            createNewFoodRandomly();
        }
        return foodEaten;
    };

    var tryAddEatenFoodAsTail = function tryAddEatenFoodAsTail(snakesTail) {
        var newTail = null;
        var last = foodPositions[foodPositions.length - 1];
        if (compareObjectCoordinates(snakesTail, last)) {
            newTail = foodPositions.pop();
            delete newTail.isEaten;
            self.addBlocktoSnake(newTail, true);
        }
        return newTail;
    };

    var markAsEatenFood = function markAsEatenFood(foodPositions) {
        foodPositions[0].isEaten = true;
        return foodPositions[0];
    }

    var getSnakesHeadBlock = function getSnakesHeadBlock() {
        return snakePositions[0];
    }

    var getSnakesTailBlock = function getSnakesTailBlock() {
        return snakePositions[snakePositions.length - 1];
    }

    var createNewFoodRandomly = function createNewFoodRandomly() {
        var cellPosition = matrix.getRandomCell();

        for (var i = 0; i < snakePositions.length; i++) {
            if (compareObjectCoordinates(snakePositions[i], cellPosition)) {
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

    var compareObjectCoordinates = function compareObjectCoordinates(objectA, objectB) {
        return objectA.x == objectB.x && objectA.y == objectB.y;
    }

    var compareObjectAbsCoordinates = function compareObjectCoordinates(objectA, objectB) {
        return Math.abs(objectA.x) == Math.abs(objectB.x) && Math.abs(objectA.y) == Math.abs(objectB.y);
    }
}
