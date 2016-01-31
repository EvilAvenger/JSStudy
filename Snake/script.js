//
// Vitaly Bibikov, Lesson 1,2
//

var GAME_CLASSES = {
    TAKENCELL: "greyout",
    FOOD: "food",
    EMPTY: "cell"
}

var GAME_MODE = {
    BOUNDS: 0,
    NO_BOUNDS: 1,
    DEATH_BOUNDS: 2
}

function Matrix(matrixSize) {
    this.matrixSize = matrixSize;
    this.matrix = createMatrix();

    this.getCell = function getCell(row, col) {
        var isTaken = false;
        if (row > matrixSize || col > matrixSize) {
            throw new Error("Wrong address of a cell: row: " + row + "column: " + col);
        }
        var location = translateToMatrixCoordinates(row, col);
        var cell = getDomCellByLocation(location);
        if (cell && cell.classList.contains(GAME_CLASSES.TAKENCELL)) {
            isTaken = true;
        }
        return isTaken;
    };

    this.redraw = function redraw(positions) {
        for (var i = 1; i <= matrixSize * matrixSize; i++) {
            var cell = getDomCellByLocation(i);
            cell.className = GAME_CLASSES.EMPTY;
        }
        for (i = 0; i < positions.length; i++) {
            var location = this.translateToMatrixCoordinates(positions[i].x, positions[i].y);
            var cell = getDomCellByLocation(location);
            cell.classList.add(GAME_CLASSES.TAKENCELL);
        }
    }

    this.getRandomCell = function getRandomCell() {
        var x = Math.floor(Math.random() * (matrixSize));
        var y = Math.floor(Math.random() * (matrixSize));
        return {
            x: x,
            y: y
        }
    }

    this.translateToMatrixCoordinates = function translateToMatrixCoordinates(col, row) {
        return coordinate = matrixSize * (row + 1) - matrixSize + col + 1;
    };

    this.addCellToMatrix = function addCellToMatrix(position, className) {
        var location = this.translateToMatrixCoordinates(position.x, position.y);
        var cell = getDomCellByLocation(location);
        cell.classList.add(className);
        console.log("Just added cell classList: " + cell.classList);
        return location;
    }

    function createMatrix() {
        var matrix = document.getElementById('matrix');

        for (var i = 0; i < matrixSize * matrixSize; i++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            matrix.appendChild(cell);
        }
        //matrix.style.width = matrix.style.height = matrixSize * matrixSize;
        return matrix;
    };

    var getDomCellByLocation = function getDomCellByLocation(location) {
        var matrix = document.getElementById('matrix'); // без присваивания перестает работать
        // зачем необходимо присваивать matrix переменной matrix? 
        // на каком-то из этапов происходит сборка мусора, как этого избежать? или я не смог найти дефект.
        return matrix.childNodes[location - 1];
    }

    var translateFromMatrixCoordinates = function translateFromCoordinates(position) {
        var row = Math.floor(position / matrixSize) - 1;
        var col = position - row * matrixSize - 1;
        return {
            x: row,
            y: col
        };
        console.log("translateFromCoordinates: X: " + raw + " Y: " + col + "position: " + position);
    };
};

function Snake(settings, matrix) {
    this.matrix = matrix;
    this.snakeSize = settings.getSnakeSize();
    this.gameMode = settings.getGameMode();

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
        if (coordinates && validateBounds(coordinates,this)) {
            matrix.redraw(snakePositions);
            checkFood(snakePositions[0]);
        }
    };

    var validateBounds = function validateBounds(coordinates,obj) {
        isValid = true;
        var tempPositions = snakePositions;

        for (var i = 0; i < snakePositions.length; i++) {
            var x = snakePositions[i].x + coordinates.x;
            var y = snakePositions[i].y + coordinates.y;
            if (x >= matrix.matrixSize || y >= matrix.matrixSize || x < 0 || y < 0) {

                if (obj.gameMode == GAME_MODE.NO_BOUNDS) {
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

    var onKeyPress = function onKeyPress(e) {
        e = e || window.event;
        pressedKey = e;
        switch (e.keyCode) {
            case KEY_CODE.ARROW_UP:
                snake.updateCoordinates({
                    x: 0,
                    y: -1
                });
                break
            case KEY_CODE.ARROW_DOWN:
                snake.updateCoordinates({
                    x: 0,
                    y: 1
                });
                break
            case KEY_CODE.ARROW_RIGHT:
                snake.updateCoordinates({
                    x: 1,
                    y: 0
                });
                break
            case KEY_CODE.ARROW_LEFT:
                snake.updateCoordinates({
                    x: -1,
                    y: 0
                });
                break
            default:
                break
        }
    };
    document.onkeypress = onKeyPress;
    setInterval(function() {
        onKeyPress(pressedKey)
    }, 3000);
}


window.onload = function() {
    var settings = new Settings(GAME_MODE.BOUNDS, 20, 1);
    var game = new GameField(settings);
    game.initialize();
}

// this.clearPosition = function clearPosition(deleteObj) {
//     var i = 0;
//     if (deleteObj) {
//         for (i; i < snakePositions.length; i++) {
//             if (snakePositions[i].x == deleteObj.x && snakePositions[i].y == deleteObj.y) {
//                 delete snakePositions[i];
//             }
//         }
//     }
// }
