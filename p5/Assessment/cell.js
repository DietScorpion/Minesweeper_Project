function Cell(i, j, w){
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighbourCount = 0;
    this.bomb = false;
    this.revealed = false;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed){
       if(this.bomb){
           fill(127);
           ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w *0.5);
       } else{
           fill(200);
           rect(this.x, this.y, this.w, this.w);
           if(this.neighbourCount > 0){
              fill(0);
              textAlign(CENTER);
              text(this.neighbourCount, this.x + this.w * 0.5, this.y + this.w - 6); 
              }
           
       }
    }
}

Cell.prototype.neighbour = function() {

    if (this.bomb){
        this.neighbourCount = -1
    }
    var total = 0;
    for(var xoff = -1; xoff <= 1; xoff++){
        for(var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff
            var j = this.j + yoff
            if(i > -1 && i < cols && j > -1 && j < rows){
                var neighbourCount = grid[i][j];
                if(neighbourCount.bomb){
                    total++;
                }
            }
        }
    }
    this.neighbourCount = total;
}

Cell.prototype.contains = function(x, y){
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function(){
    this.revealed = true
    if(this.neighbourCount == 0){
        this.floodFill();
    }
}

Cell.prototype.floodFill = function(){
    for(var xoff = -1; xoff <= 1; xoff++){
        for(var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff
            var j = this.j + yoff
            if(i > -1 && i < cols && j > -1 && j < rows){
                var neighbour = grid[i][j];
                if(!neighbour.bomb && !neighbour.revealed){
                   neighbour.reveal();
                   }
            }
        }
    } 
}