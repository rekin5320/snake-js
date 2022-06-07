function randint(a, b) {
    // Return random integer a <= x < b
    return Math.floor(Math.random() * (b - a)) + a
}

class SnakeClass {
    constructor() {
        let middle = Math.floor(board_size / 2)
        this.x = middle
        this.y = middle
        this.dirx = 0
        this.diry = 0
        this.tail = [[this.x, this.y]]
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

        if (this.x < 0 || this.x >= board_size || this.y < 0 || this.y >= board_size) {
            gameNotOver = false
            curr_dir_shower.innerText = "GAME OVER"
            curr_dir_shower.style.color = "red"
        }
        else {
            const last_segment = this.tail.shift()
            uncolor_tile(last_segment)

            const first_segment = [this.x, this.y]
            color_tile(first_segment)
            this.tail.push(first_segment)
        }
    }
}

class AppleClass {
    constructor() {
        this.move()
    }

    move() {
        this.x = randint(0, board_size)
        this.y = randint(0, board_size)
        if (Snake.tail.includes([this.x, this.y])) {
            this.move()
        }
        else {
            color_tile([this.x, this.y])
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

function color_tile([x, y]) {
    let tile = get_tile(x, y)
    tile.classList.add("snake-tail")
}

function uncolor_tile([x, y]) {
    let tile = get_tile(x, y)
    tile.classList.remove("snake-tail")
}

function restart_game() {
    if (typeof Snake != "undefined") {
        Snake.tail.forEach(uncolor_tile)
    }
    curr_dir_shower.innerText = "Current direction: None"
    curr_dir_shower.style.color = "white"
    gameNotOver = true
    Snake = new SnakeClass()
    Apple = new AppleClass()
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
const board_size = 11
var gameNotOver, Snake, Apple

restart_game()
