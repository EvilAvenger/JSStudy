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
    var startPosition = {
        x: 0,
        y: 0
    };
    var settings = new Settings(GAME_MODE.NO_BOUNDS, 20, 1, startPosition);
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
