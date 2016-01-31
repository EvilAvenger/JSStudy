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