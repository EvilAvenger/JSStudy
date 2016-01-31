function Settings(gameMode, fieldSize, snakeSize) {
    var mode = gameMode;
    var fieldSize = fieldSize;
    var snakeSize = snakeSize;

    this.getGameMode = function getGameMode() {
        return mode;
    }

    this.getFieldSize = function getFieldSize() {
        return fieldSize;
    }

    this.getSnakeSize = function getSnakeSize() {
        return snakeSize;
    }
}