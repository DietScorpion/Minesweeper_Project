var flagPic;

function Cell2(i, j, w){
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.npoints = 6;
    this.neighbourCount = 0;
    this.bomb = false;
    this.revealed = false;
    this.placeFlag = false;
}

function preload(){
    flagPic = loadImage('Images/Hexagonal Flag (borderless).png');
}

Cell2.prototype.flag = function(x, y){
    flag = image(flagPic, this.x + 40, this.y + 40);
    this.flag = true;
    console.log("Flag Active");
}


function polygon(x, y, w, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * w;
        var sy = y + sin(a) * w;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

Cell2.prototype.show = function(){
    stroke(0);
    noFill();
    
    polygon(this.x + 50, this.y + 50, this.w * 0.6, this.npoints);
    if(this.revealed){
       if(this.bomb){
           fill(127);
           ellipse(this.x + 40 + this.w * 0.5, this.y + 40 + this.w * 0.5, this.w * 0.5);
       } else{
           fill(200);
           polygon(this.x + 50, this.y + 50, this.w * 0.6, this.npoints);
           if(this.neighbourCount > 0){
              fill(0);
              textAlign(CENTER);
              text(this.neighbourCount, this.x + 40 + this.w * 0.5, this.y + 40 + this.w - 6); 
              }
           
       }
    }
}



Cell2.prototype.clickedBomb = function(x, y){    
    d = dist(mouseX, mouseY, this.x + 50, this.y + 50);
    if(d < 10 && this.bomb){
        return true;
    }
}

Cell2.prototype.clicked = function(x, y){    
    r = dist(mouseX, mouseY, this.x + 50, this.y + 50);
    if(r < 10){
        return true;
    }
}

Cell2.prototype.neighbour = function() {

    if (this.bomb){
        this.neighbourCount = -1
    }
    var total = 0;
    if(floor(this.i) % 2 == 1){
        for(var xoff = -1; xoff <= 1; xoff++){
            if(xoff == -1){
                for(var yoff = 0; yoff <= 1; yoff++){
                    var i = this.i + xoff;
                    var j = floor(this.j) + yoff;

                    if(i > -1 && i < cols2 && j > -1 && j < rows2){
                        var neighbourCount = grid2[i][j];

                        if(neighbourCount.bomb){
                            total++;
                        }
                    }
                }
            }

            if(xoff == 0){
                for(var yoff = -1; yoff <= 1; yoff++){
                    var i = this.i + xoff
                    var j = floor(this.j) + yoff

                    if(i > -1 && i < cols2 && j > -1 && j < rows2){
                        var neighbourCount = grid2[i][j];

                        if(neighbourCount.bomb){
                            total++;
                        }
                    }
                }
            }
            if(xoff == 1){
                for(var yoff = 0; yoff <= 1; yoff++){
                    var i = this.i + xoff
                    var j = floor(this.j) + yoff
                    if(i > -1 && i < cols2 && j > -1 && j < rows2){
                        var neighbourCount = grid2[i][j];
                        if(neighbourCount.bomb){
                            total++;
                        }
                    }
                }
            }
        }
    }
    if(floor(this.i) % 2 == 0){
        for(var xoff = -1; xoff <= 1; xoff++){
            if(xoff == -1){
                for(var yoff = -1; yoff <= 0; yoff++){
                    var i = this.i + xoff;
                    var j = floor(this.j) + yoff;

                    if(i > -1 && i < cols2 && j > -1 && j < rows2){
                        var neighbourCount = grid2[i][j];

                        if(neighbourCount.bomb){
                            total++;
                        }
                    }
                }
            }

            if(xoff == 0){
                for(var yoff = -1; yoff <= 1; yoff++){
                    var i = this.i + xoff
                    var j = floor(this.j) + yoff

                    if(i > -1 && i < cols2 && j > -1 && j < rows2){
                        var neighbourCount = grid2[i][j];

                        if(neighbourCount.bomb){
                            total++;
                        }
                    }
                }
            }
            if(xoff == 1){
                for(var yoff = -1; yoff <= 0; yoff++){
                    var i = this.i + xoff
                    var j = floor(this.j) + yoff
                    if(i > -1 && i < cols2 && j > -1 && j < rows2){
                        var neighbourCount = grid2[i][j];
                        if(neighbourCount.bomb){
                            total++;
                        }
                    }
                }
            }

        }
    }
    this.neighbourCount = total;
}

Cell2.prototype.contains = function(x, y){
    d = dist(mouseX, mouseY, this.x + 50, this.y + 50);
    if(d < 10){
        return true;
    }
}

Cell2.prototype.reveal = function(){
    this.revealed = true
       
    if(this.neighbourCount == 0){
        this.floodFill();
    }
}

Cell2.prototype.floodFill = function(){
    for(var xoffset = -1; xoffset <= 1; xoffset++){
        for(var yoffset = -1; yoffset <= 1; yoffset++){
            var i = this.i + xoffset
            var j = floor(this.j) + yoffset
            if(i > -1 && i < cols2 && j > -1 && j < rows2){
                var neighbour = grid2[i][j];
                if(!neighbour.bomb && !neighbour.revealed ){
                   neighbour.reveal();
                   }
            }
        }
    } 
}