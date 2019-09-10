var grid;
var cols;
var rows;
var w = 20;
var totalBombs = 20;
var gameOver = false;

//Creates a 2D array that contains the index of the columns and rows of the grid 
function make2DArray(cols, rows){
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
} 

//Detects whether a mouse clicked on a bomb
function gameover(){
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].reveal();
        }
    }
}

function mousePressed(){
    background(255);  
    if(mouseButton == LEFT){
       for (var i = 0; i < cols; i++){
           for (var j = 0; j < rows; j++){
               if(grid[i][j].contains(mouseX, mouseY)){
                   grid[i][j].reveal();
                   if(grid[i][j].bomb){
                       gameOver = true;
                       gameover();
                       reset();
                    }
                }
            }
        }
    } else if(mouseButton == RIGHT){
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                if(grid[i][j].contains(mouseX, mouseY) && !gameOver){
                    grid[i][j].checked = true;
                    grid[i][j].flag();
                }
            }
        }
    }
    
}

function keyPressed(){
    if(keyCode === 32){
        
    }
    if(keyCode === 13){
        setup();
       }
}



function setup() { 
    document.addEventListener("contextmenu", function(e){
        e.preventDefault();
    }, false);
    
    createCanvas(251, 251);
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
    
    //Removes an index from an the array that is taken up by a bomb
    for(var n = 0; n < totalBombs; n++){
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        options.splice(index,1);
        grid[i][j].bomb = true;
        
    }
    
    //Discovers and Prints the Amount of Bombs Surrounding this Object
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].neighbour();
        }
    }
}

//draws the grid of cells
function draw(){
   
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
}