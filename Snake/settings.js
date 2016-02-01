function Settings(gameMode, fieldSize, snakeSize,startPosition) {
    
    var mode = gameMode;
    var fieldSize = fieldSize;
    var snakeSize = snakeSize;
    var startPosition = startPosition;

    this.getGameMode = function getGameMode() {
        return mode;
    }

    this.getFieldSize = function getFieldSize() {
        return fieldSize;
    }

    this.getSnakeSize = function getSnakeSize() {
        return snakeSize;
    }

    this.getStartPosition = function getStartPosition(){
        return startPosition;
    }
}