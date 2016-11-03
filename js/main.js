var fill = [], $_td = $("td");
var count = 15;
var steps = 0;
var game = false;

var cells = [1, 2, 3, 6, 7, 10, 11, 14, 15, 16];
var allcells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var borderLeftCells = [5, 9, 13];

function incrementStep() {
    steps++;
    $(".step-score").text(steps);
}

function sideBySide(cellId) {
    var emptyId = parseInt($(".empty").attr('id'));
    if ($.inArray(emptyId, cells)) {
        return cellId == emptyId - 1 || cellId == emptyId + 1 || cellId == emptyId - 4 || cellId == emptyId + 4;
    } else if ($.inArray(emptyId, borderLeftCells)) {
        return cellId == emptyId + 1 || cellId == emptyId - 4 || cellId == emptyId + 4;
    } else {
        return cellId == emptyId - 1 || cellId == emptyId - 4 || cellId == emptyId + 4;
    }
}

function addClassEmptyCell() {
    $_td.addClass(function () {
        if ($(this).text() === "") {
            return "empty";
        }
    });
}

function randomFill() {
    for (var i = 0; i < count; i++) {
        var random = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }(1, count);
        i === 0 ? fill.push(random) : fill.indexOf(random) === -1 ? fill.push(random) : i--;
        $_td.eq(i).text(fill[i]);
    }
}

randomFill();
addClassEmptyCell();

$_td.on("click", function () {
    var $_this = $(this);
    var this_id = $_this.attr('id');

    if (sideBySide(this_id)) {
        if (!game) {
            pause_play_clock();
            game = true;
        }

        incrementStep();
        var currentEmpty = $(".empty");
        currentEmpty.text($_this.text());
        currentEmpty.removeClass("empty");
        $_this.addClass("empty");
        $_this.text("");
    }
    if ($("#16").text() == "" && checkVictory()) {
        $(".victory").text("Победа!");
        pause_play_clock();
        game = false;
    }
});

$(".restart").click(function () {
    $(".victory").text("");
    fill = [];
    $("#16").text("");
    $_td.removeClass("empty");
    randomFill();
    addClassEmptyCell();
    steps = 0;
    $(".step-score").text(steps);
    game = false;
    clearСlock();
});

function checkVictory() {
    var _count = 0;
    $_td.addClass(function () {
        var $_this = $(this);
        if ($_this.attr('id') == $_this.text()) {
            _count++;
        }
    });

    if (_count == 15) {
        return true;
    }
    return false;
}

$(document).keydown(function (e) {
    if (e.keyCode > 36 && e.keyCode < 41) {
        if (!game) {
            pause_play_clock();
            game = true;
        }
        var currentEmpty = $(".empty");
        var $_cell = $("#" + getMovedCellId(currentEmpty, e.keyCode));
        if ($_cell.attr("id")) {
            incrementStep();
            currentEmpty.text($_cell.text());
            currentEmpty.removeClass("empty");
            $_cell.addClass("empty");
            $_cell.text("");


            if ($("#16").text() == "" && checkVictory()) {
                $(".victory").text("Победа!");
                pause_play_clock();
                game = false;
            }
        }
    }
});

function getMovedCellId(emptyCell, kode) {
    var idEmpty = emptyCell.attr('id');
    if (kode == 37) { //left
        idEmpty++;
        if ($.inArray(parseInt(idEmpty), borderLeftCells) != -1) {
            idEmpty = -1
        }
    }

    if (kode == 38) { //up
        idEmpty = parseInt(idEmpty) + 4;
        if(!$.inArray(idEmpty, allcells)) {
            idEmpty = -1
        }
    }

    if (kode == 39) { //right
        if (parseInt($.inArray(parseInt(idEmpty), borderLeftCells)) != -1) {
            idEmpty = -1
        } else {
            idEmpty--;
        }
    }
    if (kode == 40) { //down
        idEmpty = parseInt(idEmpty) - 4;
        if($.inArray(parseInt(idEmpty), allcells) == -1) {
            idEmpty = -1
        }
    }
    return idEmpty;
}
