var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')

const width = 1170
const height = 1170
const pixel = 30
const fps = 1

function play() {
    setInterval(draw, 1000/fps)
}

class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{ x: x, y: y }]
        this.color = `rgb(255, 255, 255)`
        this.direction = { x: 1, y: 0 }
        this.rotateX = 0
        this.rotateY = 0
    }

    move(eat) {
        this.tail.unshift({
            x: this.tail[0].x + this.direction.x,
            y: this.tail[0].y + this.direction.y
        })
        if (!eat) this.tail = this.tail.slice(0, -1)
    }
}

class Apple {
    constructor({x, y}) {
        this.x = x
        this.y = y
        this.color = `rgb(255, 0, 0)`
    }
    
}

var snake = new Snake(10, 20, 1)
var apple = new Apple(randomPos())

function draw() {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = snake.color
    snake.tail.forEach(s => {
        ctx.fillStyle = `rgb(255, 255, 255)`
        ctx.fillRect(s.x * pixel + 1, s.y * pixel + 1, pixel - 2, pixel - 2)
    })

    ctx.fillStyle = apple.color
    ctx.fillRect(apple.x * pixel + 1, apple.y * pixel + 1, pixel - 2, pixel - 2)
    snake.move(Math.random() < 0.5)
}

function randomColor() {
    return Math.floor(Math.random() * 255)
}

function randomPos() {
    return {
        x: Math.floor(Math.random() * (width / pixel)),
        y: Math.floor(Math.random() * (height / pixel))
    }
}