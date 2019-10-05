var grid;
var cols;
var rows;
var grid2;
var cols2;
var rows2;
var w = 20;
var totalBombs = 20;
var flagCount = 10;
var mode = 1;
var gameMode = 0;
var gameOver = false;
var winCount;
var alt = false;
var timerCount = 0;
var highscore = 1000000;

//Creates a 2D array that contains the index of the columns and rows of the grid 
function make2DArray(cols, rows){
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
} 

//Creates a 2D array that contains the index of the columns and rows of the grid but for the Hexagon Framework
function make2DArray2(cols2, rows2){
    var arr = new Array(cols2);
    for (var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows2);
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
    for (var i = 0; i < cols2; i++){
        for (var j = 0; j < rows2; j++){
            grid2[i][j].reveal();
        }
    }
    setTimeout(lose, 3000);
}

function mousePressed(){  
    if(mouseButton == LEFT){
        if(mode == 1){
            if(gameMode == 0){
               for (var i = 0; i < cols; i++){
                   for (var j = 0; j < rows; j++){
                       if(grid[i][j].contains(mouseX, mouseY)){
                           grid[i][j].reveal();
                           if(grid[i][j].bomb){
                               gameOver = true;
                               gameover();
                               setTimeout(lose, 3000);
                            }
                        }
                    }
                }
            }
            if(gameMode == 1){
                for (var i = 0; i < cols2; i++){
                   for (var j = 0; j < rows2; j++){
                       if(grid2[i][j].clickedBomb(mouseX, mouseY)){
                           gameOver = true;
                           gameover();
                           setTimeout(lose, 3000);
                       } else if(grid2[i][j].clicked(mouseX, mouseY)){
                           grid2[i][j].reveal();
                       }
                    }
                }      
            }
        }
        
        if(mode == 2){
            if(mouseX > 115 && mouseX < 225 && mouseY > 225 && mouseY < 235){
                mode = 0;
                setup();
            }
        }
        
        if(mode == 3){
            if(mouseX > 115 && mouseX < 225 && mouseY > 225 && mouseY < 235){
                mode = 0;
                setup();
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

    }
    if(mouseButton == RIGHT){
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                if(grid[i][j].contains(mouseX, mouseY) && !gameOver){
                    drawFlags(grid[i][j]);
                    winCondition();
                    flagCount -= 1;
                }
            }
        }
        for (var i = 0; i < cols2; i++){
            for (var j = 0; j < rows2; j++){
                if(grid2[i][j].contains(mouseX, mouseY) && !gameOver){
                    grid2[i][j].placeFlag();
                    winCondition();
                    flagCount -= 1;
                }
            }
        }
    }
    
}
    

//Function that reads whether the enter key has been pressed
function keyPressed(){
    if(keyCode === 13){
        mode = 0;
        setup();
       }
}


//This is an event listener that detects if the right mouse click was used
function setup() { 
    createCanvas(351, 351);
    background(160,160,160);
    
    textSize(14);
    if(mode == 1){
        if(gameMode == 0){
            document.addEventListener("contextmenu", function(e){
                e.preventDefault();
            }, false);
            
            clock = setInterval(timer, 1000);
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
            clock2 = setInterval(timer, 1000);
            cols2 = floor(250 / w);
            rows2 = floor(250 / w);
            grid2 = make2DArray2(cols2, rows2);
            for (var i = 0; i < cols2; i++){
                if(!alt){
                   for (var j = 0; j < rows2; j++){
                        grid2[i][j] = new Cell2(i , j, w);
                   }
                    alt = true;
                }else{
                    for (var j = 0; j < rows2; j++){
                        grid2[i][j] = new Cell2(i , j + 0.5, w);
                   }
                    alt = false;
                }
                
            }
            
            // Pick the Placement of Bombs
            var options = [];
            for(var i = 0; i < cols2; i++){
                 for(var j = 0; j < rows2; j++){
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
                grid2[i][j].bomb = true;

            }
            
            //Discovers and Prints the Amount of Bombs Surrounding this Object
            for (var i = 0; i < cols2; i++){
                for (var j = 0; j < rows2; j++){
                    grid2[i][j].neighbour();
                }
            }
        }
    } else if(mode == 2){
        background(160, 160, 160);
        textSize(24);
        text("You Win!", 115, 155);
        textSize(14);
        text("Back to Main Menu", 105, 235);
              }
    else if(mode == 3){
        background(160, 160, 160);
        textSize(24);
        text("You Lose!", 115, 155);
        textSize(14);
        text("Back to Main Menu", 115, 235);
            }
    
}

function debugTools(){
    background(160, 160, 160);
    textSize(14);
    text("(X ="+mouseX+", Y ="+mouseY+")", 240, 345);
    text("Debug Tools are on!", 220, 325);
    
}

//draws the grid of cells
function draw(){
//    debugTools();
    ScreenMode();
    drawFlags();
}

function timer(){
    
    timerCount += 1;
    
}

function ScreenMode(){
    background(160, 160, 160);
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
        line(0, 30, 350, 30);
        text("Timer : ", 260, 25);
        text(timerCount, 320, 25);
        text("Flags : "+flagCount, 20, 25)
        
        if(gameMode == 0){
            for (var i = 0; i < cols; i++){
                for (var j = 0; j < rows; j++){
                    grid[i][j].show();
                }
            }
        } else if(gameMode == 1) {
            for (var i = 0; i < cols2; i++){
                for (var j = 0; j < rows2; j++){
                    grid2[i][j].show();
                }
            }
        }
        
    }
    if(mode == 2){
        background(160, 160, 160);
        textSize(24);
        text("You Win!", 115, 155);
        textSize(14);
        text("Highscore: "+highscore+" seconds", 95, 200);
        text("Back to Main Menu", 105, 235);
              }
    if(mode == 3){
        background(160, 160, 160);
        textSize(24);
        text("You Lose!", 115, 155);
        textSize(14);
        text("Back to Main Menu", 115, 235);
    }
}

//Chekcs if a player has won the game
function winCondition(){
    winCount = 0;
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            if (grid[i][j].flag == true){
                if(grid[i][j].bomb){
                    winCount += 1;
                }

            } 
        }
    }
    if(flagCount == 1){
       if(winCount == totalBombs){
            win();
        }else if(winCount !== totalBombs){
           gameover();
            setTimeout(lose, 3000);

       }
    } 
}

function drawFlags(location){
    if (gameMode == 0){
        location.placeFlag();
    }
    if (gameMode == 0){
        location.placeFlag();
    }
    
}

function win(){
    mode = 2;
    setup();
    clearInterval(clock);
    if(timerCount < highscore){
        highscore = timerCount
    }
    timerCount = 0;
}

function lose(){
    mode = 3;
    setup();
    clearInterval(clock);
    timerCount = 0;
}