//
// Создание матрицы.
//

var TAKENCELL_CLASS_NAME = " greyout";
var FOOD_CLASS_NAME = " food";
var EMPTY_CLASS_NAME = "cell";

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
        if (cell && cell.classList[1] && cell.classList[1] == TAKENCELL_CLASS_NAME) {
            isTaken = true;
        }
        return isTaken;
    };

    this.redraw = function redraw(positions) {
        for (var i = 1; i <= matrixSize * matrixSize; i++) {
            var cell = getDomCellByLocation(i);
            cell.className = EMPTY_CLASS_NAME;
        }
        for (i = 0; i < positions.length; i++) {
            var location = this.translateToMatrixCoordinates(positions[i].x, positions[i].y);
            var cell = getDomCellByLocation(location);
            cell.className += TAKENCELL_CLASS_NAME;
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
        cell.className += className;
        return location;
    }

    function createMatrix() {
        var matrix = document.getElementById('matrix');
        for (var i = 0; i < matrixSize * matrixSize; i++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            matrix.appendChild(cell);
        }
        return matrix;
    };

    function getDomCellByLocation(location) {
        return matrix.childNodes[location - 1];
    }

    var translateFromMatrixCoordinates = function translateFromCoordinates(position) {
        var row = Math.floor(position / matrixSize) - 1;
        var col = position - row * matrixSize - 1;
        return {
            x: row,
            y: col
        };
    };
};

function Snake(snakeSize, matrix) {
    this.matrix = matrix;
    this.snakeSize = snakeSize;
    var foodPosition;
    var positions = [];

    this.start = function start() {
        var position = {
            x: 0,
            y: 0
        };
        this.addBlocktoSnake(position);
    };

    this.addBlocktoSnake = function addBlocktoSnake(block) {
        if (block) {
            positions.push(block);
        }
        matrix.redraw(positions);
    };

    this.updateCoordinates = function updateCoordinates(coordinates) {
        if (coordinates) {
            for (var i = 0; i < positions.length; i++) {
                var x = positions[i].x + coordinates.x;
                var y = positions[i].y + coordinates.y;
                if (x >= 20 || y >= 20 || x < 0 || y < 0) {
                    return;
                }
                positions[i].x = x;
                positions[i].y = y;
            }
            matrix.redraw(positions);
            checkFood(positions[0]);
        }
    };

    var checkFood = function checkFood(coordinates) {
        var f = foodPosition
        if (!f || (coordinates.x == foodPosition.x && coordinates.y == foodPosition.y)) {
            foodPosition = locateFood();
        } else {
            matrix.addCellToMatrix(foodPosition, FOOD_CLASS_NAME);
        }
    };

    var locateFood = function locateFood() {
        var snakePosition = getPosition();
        var cellPosition = matrix.getRandomCell();

        for (var i = 0; i < snakePosition.length; i++) {
            if (snakePosition[i].x == cellPosition.x && snakePosition[i].y == cellPosition.y) {
                cellPosition = matrix.getRandomCell();
                i = 0;
                continue;
            }
        }
        matrix.addCellToMatrix(cellPosition, FOOD_CLASS_NAME);
        return cellPosition;
    };

    var getPosition = function getPosition() {
        return positions;
    };
}

function GameField(snake, matrix) {
    this.snake = snake;
    this.matrix = matrix;

    var ARROW_UP = 38;
    var ARROW_DOWN = 40;
    var ARROW_LEFT = 37;
    var ARROW_RIGHT = 39;
    var pressedKey;

    var onKeyPress = function onKeyPress(e) {
        e = e || window.event;
        pressedKey = e;
        switch (e.keyCode) {
            case ARROW_UP:
                snake.updateCoordinates({
                    x: 0,
                    y: -1
                });
                break
            case ARROW_DOWN:
                snake.updateCoordinates({
                    x: 0,
                    y: 1
                });
                break
            case ARROW_RIGHT:
                snake.updateCoordinates({
                    x: 1,
                    y: 0
                });
                break
            case ARROW_LEFT:
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
    var matrix = new Matrix(20);
    var snake = new Snake(2, matrix);
    var field = new GameField(snake, matrix);
    snake.start();
}

// this.clearPosition = function clearPosition(deleteObj) {
//     var i = 0;
//     if (deleteObj) {
//         for (i; i < positions.length; i++) {
//             if (positions[i].x == deleteObj.x && positions[i].y == deleteObj.y) {
//                 delete positions[i];
//             }
//         }
//     }
// }
