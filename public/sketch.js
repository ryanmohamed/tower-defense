let w = 200
let h = 200
const grid = [] // fixes same reference problem caused by the fill function
for (let i = 0; i < 10; i++) {
  grid.push(new Array(10).fill(1)) 
}

const cellWidth = w/grid[0].length
const cellHeight = h/grid.length

let brutes


const waypoints = [
    {row: 0, column: 0},
    {row: 0, column: 5},
    {row: 5, column: 5},
    {row: 5, column: 8},
    {row: 2, column: 8},
]

const inCell = (row, col) => {
    const cellWidth = w/grid[0].length
    const cellHeight = h/grid.length
    const left = col*cellWidth 
    const right = (col+1)*cellWidth 
    const up = row*cellHeight 
    const down = (row+1)*cellHeight 
    return (mouseX >= left && mouseX < right && mouseY >= up && mouseY < down)
}

const drawGrid = () => {
    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid[0].length; col++){
            inCell(row, col) ? fill(255, 0, 0) : noFill()
            stroke(255, 0, 0)
            rect(col * cellWidth + 1, row * cellHeight + 1, cellWidth, cellHeight)
        }
    }
}

const walk = async (mob) => {
    for(let waypoint of waypoints){
        await mob.moveTo(waypoint.column * cellWidth, waypoint.row * cellHeight)
    }
}

const spawnMob = async () => {
    const mob = new brutes.Sprite() 
    await walk(mob)
}

function preload() {
    for (let waypoint of waypoints) {
        const { row, column } = waypoint
        grid[row][column] = 'x'
        console.log(grid[row][column])
    } 
    console.log(grid)   
}

function setup() {
    new Canvas(w+1, h+1)
    brutes = new Group()
    brutes.x = waypoints[0].row 
    brutes.y = waypoints[0].column
    brutes.h = 20
    brutes.w = 20
    brutes.text = '☠️'
    brutes.textSize = 20
    setInterval(spawnMob, 2000)

    bricks = new Group();
	bricks.w = 20;
	bricks.h = 10;
	bricks.tile = '=';
    bricks.collider = 'none'
}

function draw() {
    background(0)
    drawGrid()
}

function mousePressed() {
    createP(mouseX + '  ' + mouseY)
}