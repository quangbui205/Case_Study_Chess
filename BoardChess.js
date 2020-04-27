let canvas = document.getElementById("myCanvas1");
const cellSize =40;
class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.getRandomColor();
        ctx.fill();
        ctx.closePath();
    }
}

class GameBoard {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = [];
    }

    init() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let cell = new Cell(i*cellSize, j*cellSize, cellSize, cellSize);
                this.cells.push(cell);
            }
        }
    }

    draw() {
        for (let i = 0; i <this.cells.length ; i++) {
            this.cells[i].draw();
        }
    }
}
let gameBoard = new GameBoard(10,10);

gameBoard.init();
gameBoard.draw();