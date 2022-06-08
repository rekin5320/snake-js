function randint(a, b) {
    // Returns random integer a <= x < b
    return Math.floor(Math.random() * (b - a)) + a
}

class SnakeClass {
    constructor() {
        this.css_class = "snake-tail"
        let middle = Math.floor(board_size / 2)
        this.x = middle
        this.y = middle
        this.dirx = 0
        this.diry = 0
        this.dirx_current = 0
        this.diry_current = 0
        this.tail = [[this.x, this.y]]
        color_tile(this.tail[0], this.css_class)
        this.score = 1
        this.update_score()
    }

    tail_count([x, y]) {
        let n = 0
        this.tail.forEach(([xi, yi]) => (x === xi && y === yi) ? n += 1 : null)
        return n
    }

    change_dir_left() {
        if (this.dirx_current === 0) {
            this.dirx = -1
            this.diry = 0
            curr_dir_shower.innerText = "Current direction: Left"
        }
    }

    change_dir_right() {
        if (this.dirx_current === 0) {
            this.dirx = 1
            this.diry = 0
            curr_dir_shower.innerText = "Current direction: Right"
        }
    }

    change_dir_up() {
        if (this.diry_current === 0) {
            this.dirx = 0
            this.diry = -1
            curr_dir_shower.innerText = "Current direction: Up"
        }
    }

    change_dir_down() {
        if (this.diry_current === 0) {
            this.dirx = 0
            this.diry = 1
            curr_dir_shower.innerText = "Current direction: Down"
        }
    }

    update_score() {
        score_shower.innerText = this.score
    }

    move() {
        if (this.dirx || this.diry) {
            this.dirx_current = this.dirx
            this.diry_current = this.diry
            this.x += this.dirx
            this.y += this.diry

            if (this.x < 0 || this.x >= board_size || this.y < 0 || this.y >= board_size) {
                return game_over()
            }
            else {
                const first_segment = [this.x, this.y]
                this.tail.push(first_segment)

                if (this.tail_count(first_segment) > 1) {
                    game_over()
                }
                else {
                    if (this.x === Apple.x && this.y === Apple.y) {
                        this.score += 1
                        this.update_score()
                        Apple.hide()
                        Apple.move()
                    }
                    else {
                        const last_segment = this.tail.shift()
                        uncolor_tile(last_segment, this.css_class)
                    }
    
                    color_tile(first_segment, this.css_class)
                }
            }
        }
    }
}

class AppleClass {
    constructor() {
        this.css_class = "apple"
        this.move()
    }

    move() {
        this.x = randint(0, board_size)
        this.y = randint(0, board_size)
        if (Snake.tail.includes([this.x, this.y])) {
            this.move()
        }
        else {
            this.show()
        }
    }

    hide() {
        uncolor_tile([this.x, this.y], this.css_class)
    }

    show() {
        color_tile([this.x, this.y], this.css_class)
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

function color_tile([x, y], css_class) {
    let tile = get_tile(x, y)
    tile.classList.add(css_class)
}

function uncolor_tile([x, y], css_class) {
    let tile = get_tile(x, y)
    tile.classList.remove(css_class)
}

function game_over() {
    console.log(`Game over, score: ${this.score}`)
    gameNotOver = false
    curr_dir_shower.innerText = "GAME OVER"
    curr_dir_shower.style.color = "red"
    start_button.disabled = false
}

function restart_game() {
    if (!gameNotOver) {
        if (typeof Snake != "undefined") {
            Snake.tail.forEach(([x, y]) => uncolor_tile([x, y], Snake.css_class))
        }
        if (typeof Apple != "undefined") {
            uncolor_tile([Apple.x, Apple.y], Apple.css_class)
        }
        curr_dir_shower.innerText = "Current direction: None"
        curr_dir_shower.style.color = "white"
        start_button.disabled = true
        gameNotOver = true
        Snake = new SnakeClass()
        Apple = new AppleClass()
        main_loop()
    }
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
const score_shower = document.getElementById("score-shower")
const curr_dir_shower = document.getElementById("curr-dir")
const start_button = document.getElementById("start-button")
const board_size = 11
var gameNotOver, Snake, Apple