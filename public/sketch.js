let w = 400
let h = 400

let mobWidth = w / 20 
let mobHeight = w / 20 

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
    {row: 5, column: 7},
    {row: 2, column: 7},
    {row: 2, column: 9},
    {row: 7, column: 9},
    {row: 7, column: 1},
    {row: 9, column: 1},
]

const fillWaypoints = () => {
    for(let i = 0; i < waypoints.length; i++){
        if (i === waypoints.length-1) break 
        const a = waypoints[i]
        const b = waypoints[i+1]
        const rowDiff = b.row - a.row 
        const colDiff = b.column - a.column
        console.log(a, b, rowDiff, colDiff)
        if (colDiff !== 0) {
            const newbies = []
            if(colDiff > 0)
                for(let j = a.column+1; j < b.column; j++) 
                    newbies.push({row: a.row, column: j})
            else if(colDiff < 0)
                for(let j = a.column-1; j > b.column; j--) 
                    newbies.push({row: a.row, column: j})
            waypoints.splice(i+1, 0, ...newbies)
            i = i+newbies.length
        }
        else if (rowDiff !== 0) {
            const newbies = []
            if(rowDiff > 0)
                for(let j = a.row+1; j < b.row; j++) 
                    newbies.push({row: j, column: a.column})
            else if(rowDiff < 0)
                for(let j = a.row-1; j > b.row; j--) 
                    newbies.push({row: j, column: a.column})
            waypoints.splice(i+1, 0, ...newbies)
            i = i+newbies.length
        }
    }
    console.log(waypoints)
}

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
            grid[row][col] == 'x' ? fill(0, 255, 0) : noFill()
            stroke(255, 0, 0)
            rect(col * cellWidth + 1, row * cellHeight + 1, cellWidth, cellHeight)
        }
    }
}

const walk = async (mob) => {
    for(let waypoint of waypoints){
        const x = waypoint.column * cellWidth + (cellWidth/2)
        const y = waypoint.row * cellHeight + (cellHeight/2)
        await mob.moveTo(x, y, 1)
    }
}

const toCoordinate = ({row, column}) => {
    return {
        x: column * cellWidth + (cellWidth/2), 
        y: row * cellHeight + (cellHeight/2)
    }
}

const spawnMob = async () => {
    const mob = new brutes.Sprite() 
    await walk(mob)
}

function preload() {
    fillWaypoints()
    for (let waypoint of waypoints) {
        const { row, column } = waypoint
        grid[row][column] = 'x'
    } 
    console.log(grid)   
}

function setup() {
    new Canvas(w+1, h+1)
    brutes = new Group()
    brutes.x = toCoordinate(waypoints[0]).x
    brutes.y = toCoordinate(waypoints[0]).y
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