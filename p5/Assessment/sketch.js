var grid;
var cols;
var rows;
var w = 20;
var totalBombs = 20;
var mode = 0;
var gameMode = 0;
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
    if(mouseButton == LEFT){
        if(mode == 1){
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
        }
    }
        if(mode == 0){
            if(mouseX > 105 && mouseX < 220 && mouseY > 145 && mouseY < 155){
                mode = 1;
                setup();
        }
            if(mouseX > 105 && mouseX < 111 && mouseY > 235 && mouseY < 245){
                if(gameMode == 0){
                    gameMode = 1;
                    setup();
                   } else {
                    gameMode = 0;
                    setup();
                   }
               }
            if(mouseX > 215 && mouseX < 221 && mouseY > 235 && mouseY < 245){
                if(gameMode == 0){
                    gameMode = 1;
                    setup();
                   } else {
                    gameMode = 0;
                    setup();
                   }
               }
    }
    if(mouseButton == RIGHT){
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
    

//Function that reads whether the enter key has been pressed
function keyPressed(){
    if(keyCode === 13){
        setup();
       }
}


//This is an event listener that detects if the right mouse click was used
function setup() { 
    
    createCanvas(351, 351);
    textSize(14);
    
    if(mode == 1){
        if(gameMode == 0){
            document.addEventListener("contextmenu", function(e){
                e.preventDefault();
            }, false);



            cols = floor(250 / w);
            rows = floor(250 / w);
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
        } else{
            
        }
    }
    
}

function debugTools(){
    background(220,220,220);
    textSize(14);
    text("(X ="+mouseX+", Y ="+mouseY+")", 240, 345);
    text("Debug Tools are on!", 220, 325);
    
}

//draws the grid of cells
function draw(){
    
//    debugTools();
    
    if(mode == 0){
        text("Start Minesweeper", 105, 155);
        text("<", 105, 245);
        text(">", 215, 245);
        if(gameMode == 0){
           text("Square", 140, 245);
           }
        if(gameMode == 1){
           text("Hexagon",140, 245);
           }
            
    }
    
    if(mode == 1){
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                grid[i][j].show();
            }
        }
    }
}

//Chekcs if a player has won the game
function winCondition(){
    for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                if (grid[i][j].flag){
                    if(grid[i][j].bomb){
                        count += 1;
                        print(count)
                    }
                    
                }
            }
    }
}