function Snake(settings, matrix) {

    this.matrix = matrix;
    this.snakeSize = settings.getSnakeSize();
    this.gameMode = settings.getGameMode();

    var self = this;
    var snakePositions = [];

    this.getSnakePositions = function getSnakePositions() {
        return snakePositions;
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

    this.hasSnakeAteItself = function hasSnakeAteItself(newHead) {
        var isAte = false;
        for (var i = 1; i < snakePositions.length; i++) {
            if (newHead.compareObjectCoordinates(snakePositions[i])) {
                isAte = true;
                break;
            }
        }
        return isAte;
    }

    this.checkReverseMove = function checkReverseMove(prevMove, coordinates) {
        isReverse = false;
        if (prevMove && coordinates) {
            isReverse = !prevMove.compareObjectCoordinates(coordinates) && prevMove.compareObjectAbsCoordinates(coordinates);
        }
        return isReverse;
    }

    this.tryGetNewHeadPosition = function tryGetNewHeadPosition(coordinates) {
        var position = {};
        if (coordinates) {
            var snakesHead = getSnakesHeadBlock() || coordinates;
            position.x = coordinates.x + snakesHead.x;
            position.y = coordinates.y + snakesHead.y;
            position = self.addBlocktoSnake(validateBounds(position), false);
        }
        return position;
    }

    this.checkFoodWasEaten = function checkFoodWasEaten(snakesHead, foodPositions) {
        var food = foodPositions && foodPositions[0];
        var foodEaten = false;

        if (!food) {
            foodEaten = true;
        }
        if (food && (foodEaten = snakesHead.compareObjectCoordinates(food))) {
            markAsEatenFood(foodPositions);
            foodEaten = true;
        }
        updateSnake();
        return foodEaten;
    };

    this.tryAddEatenFoodAsTail = function tryAddEatenFoodAsTail(foodPositions) {
        var currentTail = getSnakesTailBlock();
        var newTail = null;
        var last = foodPositions[foodPositions.length - 1];
        if (currentTail.compareObjectCoordinates(last)) {
            newTail = foodPositions.pop();
            delete newTail.isEaten;
            self.addBlocktoSnake(newTail, true);
        }
        return newTail;
    };

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
}
