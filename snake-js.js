const board = document.getElementById("board").children[0]

function get_tile(x, y) {
    return board.children[y].children[x]
}

function something() {
    let tile = get_tile(2, 1)

    if (tile.style.background === "gray") {
        tile.style.background = "red"
    }
    else {
        tile.style.background = "gray"
    }
}
