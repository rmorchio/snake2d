console.log('loaded correctly!')

const height = 1200
const width = 1200
const pixel = 30
const fps = 15

function randomColor() {
    return Math.floor(Math.random() * 255)
}

function randomPos() {
    return {
        x: Math.floor(Math.random() * (width / pixel)),
        y: Math.floor(Math.random() * (height / pixel))
    }
}

function play() {
    setInterval(draw, 1000/fps)
}

function draw() {
    var canvas = document.getElementById('game')
    var ctx = canvas.getContext('2d')

    for (let i = 0; i < width / pixel; i++) {
        for (let j = 0; j < height / pixel; j++) {
            ctx.fillStyle = `rgb(${randomColor()},${randomColor()},${randomColor()})`
            ctx.fillRect(i * pixel, j * pixel, pixel * (i + 1), pixel * (j + 1))
        }
    }
}