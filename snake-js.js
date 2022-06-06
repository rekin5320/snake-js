class SnakeClass {
    constructor() {
        this.x = 2
        this.y = 2
        this.dirx = 0
        this.diry = 0
        this.tail = [get_tile(this.x, this.y)]
        color_tile(this.tail[0])
    }

    change_dir_left() {
        if (this.dirx === 0) {
            this.dirx = -1
            this.diry = 0
            curr_dir_shower.innerText = "Left"
        }
    }

    change_dir_right() {
        if (this.dirx === 0) {
            this.dirx = 1
            this.diry = 0
            curr_dir_shower.innerText = "Right"
        }
    }

    change_dir_up() {
        if (this.diry === 0) {
            this.dirx = 0
            this.diry = -1
            curr_dir_shower.innerText = "Up"
        }
    }

    change_dir_down() {
        if (this.diry === 0) {
            this.dirx = 0
            this.diry = 1
            curr_dir_shower.innerText = "Down"
        }
    }

    move() {
        // TODO border crossing
        this.x += this.dirx
        this.y += this.diry

        const last_segment = this.tail.shift()
        uncolor_tile(last_segment)

        const first_segment = get_tile(this.x, this.y)
        color_tile(first_segment)
        this.tail.push(first_segment)
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

function main_loop() {
    console.log("Next move")
    Snake.move()
    if (gameNotOver) {
        setTimeout(main_loop, 1000);
    }
}

document.onkeydown = check_key
const board = document.getElementById("board").children[0]
const curr_dir_shower = document.getElementById("curr-dir")
var gameNotOver = true
const Snake = new SnakeClass()

main_loop()
