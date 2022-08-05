var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')

class Snake {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.tail = [{ x: x, y: y }]
        this.color = `rgb(255, 255, 255)`
        this.direction = { x: 1, y: 0 }
    }

    move() {
        let newRect = {
            x: this.tail[this.tail.length - 1].x + this.direction.x,
            y: this.tail[this.tail.length - 1].y + this.direction.y
        }

        this.tail.shift()
        this.tail[this.tail.length] = (newRect)
    }
}

class Apple {
    constructor(x, y) {
        if (!x && !y) {
            do {
                ({ x, y } = randomPos())
            } while (snake.tail.map(t => t.x).includes(x) && snake.tail.map(t => t.y).includes(y));

        }
        this.x = x
        this.y = y
        this.color = `rgb(255, 0, 0)`
    }
}

const pixel = 30
const fps = 15
let boundless = true;
let keyPressed = false
let paused = false

window.onload = () => {
    play()
}

function play() {
    window.game = setInterval(render, 1000 / fps)
}

function render() {
    update()
    draw()
}

function update() {
    keyPressed = false
    snake.move()
    checkEatApple()
    checkHitWall()
    checkHitItself()
}

function checkEatApple() {
    if (snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
        apple = new Apple()
    }
}

function checkHitWall() {
    let head = structuredClone(snake.tail[snake.tail.length - 1]),
        prevHead = structuredClone(head)
    if (head.x == - 1) head.x = canvas.width / pixel - 1
    if (head.x * pixel == canvas.width) head.x = 0
    if (head.y == - 1) head.y = canvas.height / pixel - 1
    if (head.y * pixel == canvas.height) head.y = 0
    if (head.x !== prevHead.x || head.y !== prevHead.y) checkLost()

    snake.tail[snake.tail.length - 1] = head
}

function checkHitItself() {
    if (snake.tail.length < 4) return

    const head = snake.tail[snake.tail.length - 1]
    for (let i = 0; i < snake.tail.length - 2; i++) {
        if (head.x == snake.tail[i].x && head.y == snake.tail[i].y) lose()
    }
}

function checkLost() {
    if (!boundless) lose()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    snake.tail.forEach(s => {
        createRect(s.x * pixel + 1, s.y * pixel + 1, pixel - 2, pixel - 2, snake.color)
    })

    createRect(apple.x * pixel + 1, apple.y * pixel + 1, pixel - 2, pixel - 2, apple.color)

    ctx.font = "30px Verdana"
    ctx.fillStyle = "#00FF00"
    ctx.fillText("Score: " + (snake.tail.length - 1), canvas.width - 200, 30)
}

function createRect(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function pause() {
    paused = !paused
    if (paused) {
        clearInterval(window.game)
        drawMenu()
        return
    }
    play()
}

function drawMenu() {
    ctx.font = "80px Verdana"
    ctx.fillStyle = "#00FF00"
    ctx.fillText('Paused', canvas.width / 2 - ctx.measureText('Paused').width / 2, canvas.height / 3)

    ctx.font = "40px Verdana"
    ctx.fillStyle = "#00FF00"
    let textString = `Borders are ${boundless ? 'deactivated' : 'activated'}. Press B to change.`,
        textWidth = ctx.measureText(textString).width
    ctx.fillText(
        textString,
        canvas.width / 2 - textWidth / 2,
        canvas.height / 2
    )
}

function lose() {
    clearInterval(window.game)

    alert('Jaja perdiste salame')

    /*ctx.font = "80px Verdana"
    ctx.fillStyle = "#00FF00"
    ctx.fillText('You lose!', canvas.width / 2 - ctx.measureText('You lose!').width / 2, canvas.height / 3)

    ctx.font = "40px Verdana"
    ctx.fillStyle = "#00FF00"
    let textString = `Your score is ${snake.tail.length - 1}. Press SPACE to play again.`,
        textWidth = ctx.measureText(textString).width
    ctx.fillText(
        textString,
        canvas.width / 2 - textWidth / 2,
        canvas.height / 2
    )*/
}

window.addEventListener("keydown", ({ key }) => {
    setTimeout(() => {
        let [x, y] = [0, 0]

        if (key == 'p') pause()
        if (key == 'b' && paused) {
            boundless = !boundless
            draw()
            drawMenu()
        }
        if (paused || keyPressed) return
        if (key == 'ArrowRight' && snake.direction.x != -1) x++
        if (key == 'ArrowLeft' && snake.direction.x != 1) x--
        if (key == 'ArrowDown' && snake.direction.y != -1) y++
        if (key == 'ArrowUp' && snake.direction.y != 1) y--

        if (x || y) {
            snake.direction = { x, y }
            keyPressed = true
        }
    }, 1)
})

function randomPos() {
    return {
        x: Math.floor(Math.random() * (canvas.width / pixel)),
        y: Math.floor(Math.random() * (canvas.height / pixel))
    }
}

var snake = new Snake(10, 20, 1)
var apple = new Apple(17, 20)