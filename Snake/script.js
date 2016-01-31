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

window.onload = function() {
    var settings = new Settings(GAME_MODE.NO_BOUNDS, 20, 1);
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
