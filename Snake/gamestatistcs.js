function GameStatistics() {

    var points = -1;
    var length = 0;
    var foodCount = 0;

    this.scoreUp = function scoreUp(amount) {
        if (!amount) {
            points++;
        } else {
            points += amount;
        }
        $("#scorepoints").text(points);
    };

    this.scoreDown = function scoreDown() {
        points--;
        $("#scorepoints").text(points);
    };

    this.getPoints = function getPoints() {
        return points;
    };

    this.lengthUp = function lengthUp() {
        length++;
        $("#lengthpoints").text(length);
    };

    this.lengthDown = function lengthDown() {
        length--;
        $("#lengthpoints").text(length);
    };

    this.setSpeed = function setSpeed() {
        var speed = Math.round(this.getLength() / 10) + 1;
        $("#speed").text(speed);
        return ;
    };

    this.setFoodCount = function setFoodCount() {
        foodCount++;
        $("#foodCount").text(foodCount);
    };

    this.getLength = function getLength() {
        return length;
    };
}
