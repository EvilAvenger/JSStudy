function Matrix(matrixSize) {

    this.matrixSize = matrixSize;
    this.matrix = createMatrix();

    var toggleClass = function toggleClass(location, className) {
        var cell = getDomCellByLocation(location);
        cell.classList.toggle(className);
    }

    var addClass = function addClass(location, className) {
        var cell = getDomCellByLocation(location);
        if (!cell.classList.contains(className)) {
            cell.classList.add(className);
        }
    }

    var removeClass = function removeClass(location, className) {
        var cell = getDomCellByLocation(location);
        if (cell.classList.contains(className)) {
            cell.classList.remove(className);
        }
    }

    this.addTail = function addTail(positions) {
        if (positions) {
            addClass(this.translateToMatrixCoordinates(positions.x, positions.y), GAME_CLASSES.TAKENCELL);
            removeClass(this.translateToMatrixCoordinates(positions.x, positions.y), GAME_CLASSES.TAKENFOOD);
        }
    }

    this.redrawSnake = function redrawSnake(positions) {
        if (positions) {
            var first = positions[0];
            toggleClass(this.translateToMatrixCoordinates(first.x, first.y), GAME_CLASSES.TAKENCELL);
            if (positions.length > 1) {
                var last = positions[positions.length - 1];
                toggleClass(this.translateToMatrixCoordinates(last.x, last.y), GAME_CLASSES.TAKENCELL);
                removeClass(this.translateToMatrixCoordinates(last.x, last.y), GAME_CLASSES.TAKENFOOD);
            }
        }
    }

    this.redrawFood = function redrawFood(positions) {
        for (var i = 0; i < positions.length; i++) {
            if (positions[i] && positions[i].isEaten) {
                removeClass(this.translateToMatrixCoordinates(positions[i].x, positions[i].y), GAME_CLASSES.TAKENCELL);
                removeClass(this.translateToMatrixCoordinates(positions[i].x, positions[i].y), GAME_CLASSES.FOOD);
                addClass(this.translateToMatrixCoordinates(positions[i].x, positions[i].y), GAME_CLASSES.TAKENFOOD);
            } else {
                addClass(this.translateToMatrixCoordinates(positions[i].x, positions[i].y), GAME_CLASSES.FOOD);
            }
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

    this.clearBody = function clearBody(){
        document.body.matrix.innerHTML = "";
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

    var getDomCellByLocation = function getDomCellByLocation(location) {
        var matrix = document.getElementById('matrix'); 
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
