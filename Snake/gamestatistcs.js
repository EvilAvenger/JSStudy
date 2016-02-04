function GameStatistics() {

    var points = -1;
    var length = 0;

    this.scoreUp = function scoreUp() {
        points++;
        $("#scorepoints").text(points);
    }

    this.scoreDown = function scoreDown() {
        points--;
        $("#scorepoints").text(points);
    }

    this.getPoints = function getPoints() {
        return points;
    }

    this.lengthUp = function lengthUp() {
        length++;
        $("#lengthpoints").text(length);
    }

    this.lengthDown = function lengthDown() {
        length--;
        $("#lengthpoints").text(length);
    }

    this.getLength = function getLength() {
        return length;
    }
}
