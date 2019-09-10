var grid;
var cols;
var rows;
var w = 20;

var totalBombs = 10;

//Creates the 2D array
function make2DArray(cols, rows){
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function gameover(){
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].reveal();
        }
    }
}

function mousePressed(){
    background(255);   
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            if(grid[i][j].contains(mouseX, mouseY)){
                grid[i][j].reveal();
                
                if(grid[i][j].bomb){
                   gameover();
                   }
            }
        }
    }
}

function setup() { 
    createCanvas(201, 201);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j] = new Cell(i, j, w);
        }
    }
    
    // Pick the Placement of Bombs
    var options = [];
    for(var i = 0; i < cols; i++){
         for(var j = 0; j < rows; j++){
            options.push([i,j]);
        }
    }
    for(var n = 0; n < totalBombs; n++){
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        options.splice(index,1);
        grid[i][j].bomb = true;
        
    }
    
    //Calculate the total number of bombs ajacent 
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].neighbour();
        }
    }
}

function draw(){
    background(255);   
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
}