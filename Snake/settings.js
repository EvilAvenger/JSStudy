function Settings(gameMode, fieldSize, snakeSize, startPosition) {

    this.gameMode = gameMode;
    var self = this;
    var fieldSize = fieldSize;
    var snakeSize = snakeSize;
    var startPosition = startPosition;

    this.initialize = function initialize() {
        this.changeBorderSettings(gameMode);
        $("input[name=bounds]").change(function() {
            self.changeBorderSettings(GAME_MODE[this.id]);
        });
    }

    this.changeBorderSettings = function changeBorderSettings(mode) {
        switch (mode) {
            case GAME_MODE.BOUNDS:
                $("#matrix").css({
                    "border-color": "#FF0000",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                $("#BOUNDS").prop("checked", true);
                break
            case GAME_MODE.NOBOUNDS:
                $("#matrix").css('border', '');
                $("#NOBOUNDS").prop("checked", true);
                break
            case GAME_MODE.DEATHBOUNDS:
                $("#" + name).prop("checked", true);
                break
            default:
                break
        }
        this.gameMode = mode;
    }

    this.toggleSettings = function toggleSettings(disable) {
        $("#NOBOUNDS").prop("disabled", disable);
        $("#BOUNDS").prop("disabled", disable);
        $("#DEATHBOUNDS").prop("disabled", disable);
    }

    this.getGameMode = function getGameMode() {
        return this.gameMode;
    }

    this.getFieldSize = function getFieldSize() {
        return fieldSize;
    }

    this.getSnakeSize = function getSnakeSize() {
        return snakeSize;
    }

    this.getStartPosition = function getStartPosition() {
        return startPosition;
    }

    this.MOVE = {
        UP: {
            x: 0,
            y: -1
        },
        DOWN: {
            x: 0,
            y: 1
        },
        LEFT: {
            x: -1,
            y: 0
        },
        RIGHT: {
            x: 1,
            y: 0
        }
    }
}
