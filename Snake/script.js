//
// Vitaly Bibikov, Lesson 1,2,3
//
var GAME_CLASSES = {
    TAKENCELL: "greyout",
    FOOD: "food",
    TAKENFOOD: "foodtaken",
    EMPTY: "cell"
}

var GAME_MODE = {
    BOUNDS: 0,
    NO_BOUNDS: 1,
    DEATH_BOUNDS: 2
}

window.onload = function() {
    initHelperFunctions();
    var startPosition = {
        x: 0,
        y: 0
    };
    var settings = new Settings(GAME_MODE.NO_BOUNDS, 20, 1, startPosition);
    var game = new GameField(settings);
    game.initialize();
}

function initHelperFunctions() {
    Object.prototype.compareObjectCoordinates = function compareObjectCoordinates(that) {
        return this.x == that.x && this.y == that.y;
    }

    Object.prototype.compareObjectAbsCoordinates = function compareObjectAbsCoordinates(that) {
        return Math.abs(this.x) == Math.abs(that.x) && Math.abs(this.y) == Math.abs(that.y);
    }
}
