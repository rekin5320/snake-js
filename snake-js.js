class SnakeClass {
    constructor() {
        this.x = 5
        this.y = 5
        this.dirx = 0
        this.diry = 0
        this.tail = [get_tile(this.x, this.y)]
        color_tile(this.tail[0])
    }

    change_dir_left() {
        if (this.dirx === 0) {
            this.dirx = -1
            this.diry = 0
            curr_dir_shower.innerText = "Current direction: Left"
        }
    }

    change_dir_right() {
        if (this.dirx === 0) {
            this.dirx = 1
            this.diry = 0
            curr_dir_shower.innerText = "Current direction: Right"
        }
    }

    change_dir_up() {
        if (this.diry === 0) {
            this.dirx = 0
            this.diry = -1
            curr_dir_shower.innerText = "Current direction: Up"
        }
    }

    change_dir_down() {
        if (this.diry === 0) {
            this.dirx = 0
            this.diry = 1
            curr_dir_shower.innerText = "Current direction: Down"
        }
    }

    move() {
        this.x += this.dirx
        this.y += this.diry

        if (this.x < 0 || this.x > 10 || this.y < 0 || this.y > 10) {
            gameNotOver = false
            curr_dir_shower.innerText = "GAME OVER"
            curr_dir_shower.style.color = "red"
        }
        else {
            const last_segment = this.tail.shift()
            uncolor_tile(last_segment)

            const first_segment = get_tile(this.x, this.y)
            color_tile(first_segment)
            this.tail.push(first_segment)
        }
    }
}

function check_key(e) {
    switch (e.key) {
        case "ArrowLeft":
            console.log("left")
            Snake.change_dir_left()
            break;
        case "ArrowRight":
            console.log("right")
            Snake.change_dir_right()
            break;
        case "ArrowUp":
            console.log("up")
            Snake.change_dir_up()
            break;
        case "ArrowDown":
            console.log("down")
            Snake.change_dir_down()
    }
}

function get_tile(x, y) {
    return board.children[y].children[x]
}

function color_tile(tile) {
    tile.style.backgroundColor = "green"
}

function uncolor_tile(tile) {
    tile.style.backgroundColor = "gray"
}

function restart_game() {
    if (typeof Snake != "undefined") {
        Snake.tail.forEach(uncolor_tile)
    }
    curr_dir_shower.innerText = "Current direction: None"
    curr_dir_shower.style.color = "white"
    gameNotOver = true
    Snake = new SnakeClass()
    main_loop()
}

function main_loop() {
    console.log("Next move")
    Snake.move()
    if (gameNotOver) {
        setTimeout(main_loop, 400);
    }
}

document.onkeydown = check_key
const board = document.getElementById("board").children[0]
const curr_dir_shower = document.getElementById("curr-dir")
var gameNotOver, Snake

restart_game()
