function check_key(e) {
    switch_tile_color(xx, yy)
    switch (e.key) {
        case "ArrowUp":
            console.log("up")
            yy -= 1
            break;
        case "ArrowDown":
            console.log("down")
            yy += 1
            break;
        case "ArrowLeft":
            console.log("left")
            xx -= 1
            break;
        case "ArrowRight":
            console.log("right")
            xx += 1
    }
    if (xx < 0 || xx > 4) {
        xx = Math.abs(xx) - 1
    }
    else if (yy < 0 || yy > 4) {
        yy = Math.abs(yy) - 1
    }
    switch_tile_color(xx, yy)
}

function get_tile(x, y) {
    return board.children[y].children[x]
}

function switch_tile_color(x, y) {
    let tile = get_tile(x, y)

    if (tile.style.backgroundColor === "red") {
        tile.style.backgroundColor = "gray"
    }
    else {
        tile.style.backgroundColor = "red"
    }
}

document.onkeydown = check_key
const board = document.getElementById("board").children[0]

var xx = 0, yy = 0
switch_tile_color(xx, yy)
