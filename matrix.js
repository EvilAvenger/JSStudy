function Matrix(matrixSize) {

    this.matrixSize = matrixSize;
    this.matrix = createMatrix();

    var toggleClass = function toggleClass(cell, className) {
        $(cell).toggleClass(className);
    }

    var addClass = function addClass(cell, className) {
        if (!cell.hasClass(className)) {
            $(cell).addClass(className);
        }
    }

    var removeClass = function removeClass(cell, className) {
        $(cell).removeClass(className);
    }

    this.addTail = function addTail(positions) {
        if (positions) {
            var cell = this.getElementIndex(positions[0].x, positions[0].y);
            addClass(cell, GAME_CLASSES.TAKENCELL);
            removeClass(cell, GAME_CLASSES.TAKENFOOD);
        }
    }

    this.redrawSnake = function redrawSnake(positions) {
        if (positions) {
            var first = this.getElementIndex(positions[0].x, positions[0].y);
            toggleClass(first, GAME_CLASSES.TAKENCELL);

            if (positions.length > 1) {
                var last = positions[positions.length - 1];
                last = this.getElementIndex(last.x, last.y);
                toggleClass(last, GAME_CLASSES.TAKENCELL);
                removeClass(last, GAME_CLASSES.TAKENFOOD);
            }
        }
    }

    this.redrawFood = function redrawFood(positions) {
        for (var i = 0; i < positions.length; i++) {
            var elements = this.getElementIndex(positions[i].x, positions[i].y);
            if(positions[i].isExpired){
               removeClass(elements, GAME_CLASSES.FOOD); 
               delete positions[i].isExpired;
            }
            else if (positions[i].isEaten) {
                removeClass(elements, GAME_CLASSES.TAKENCELL);
                removeClass(elements, GAME_CLASSES.FOOD);
                addClass(elements, GAME_CLASSES.TAKENFOOD);
                delete positions[i].isExpired;
            } else {
                addClass(elements, GAME_CLASSES.FOOD);
                if (positions[i].hasOwnProperty("foodType")) {
                    var pos = positions[i].foodType.x + "px " + positions[i].foodType.y + "px";
                    $(elements).css("background-position", pos);
                }
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

    this.getElementIndex = function getElementIndex(col, row) {
        coordinate = matrixSize * (row + 1) - matrixSize + col;
        return $("#matrix").children().eq(coordinate).first();
    };

    this.clearBody = function clearBody() {
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
};
