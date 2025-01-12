let minGrids = [];
let currentGrid = 10;
let turn = 1;
let compTurn = false;

class MinorGrid{
    constructor(maj_num, x1, x2, y1, y2, clicked, space){
      this.maj_num = maj_num;
      this.x1 = x1;
      this.x2 = x2;
      this.y1 = y1;
      this.y2 = y2;
      this.clicked = clicked;
      this.space = space;
      this.width = abs(x1 - x2);
      this.children = [];
    }
    drawSquares(){
      for(var x = 0; x < 3; x++){
        for(var y = 0; y < 3; y++){
          let b = new Square(this.maj_num, 3 * y + x, this.x1 + x * this.width / 3, this.x1 + (x + 1) * this.width / 3, this.y1 + y * this.width / 3, this.y1 + (y + 1) * this.width / 3, 0);
          this.children.push(b);
        }
      }
    }
    show(){
      if(checkWin(this.children) == 1){
        console.log("o wins");
        return;
      }
      else if(checkWin(this.children) == -1){
        console.log("x wins");
        return;
      }
      else{
        for(var i = 0; i < 9; i ++){
          this.children[i].show();
          strokeWeight(2);
          stroke(150);
          line( this.x1 + 1 / 3 * this.width, this.y1  + this.space, this.x1 + 1 / 3 * this.width, this.y2 - this.space);
          line( this.x1 + 2 / 3 * this.width, this.y1  + this.space, this.x1 + 2 / 3 * this.width, this.y2 - this.space);
          line( this.x1 + this.space, this.y1 + 1 / 3 * this.width, this.x2 - this.space, this.y1 + 1 / 3 * this.width);
          line( this.x1 + this.space, this.y1 + 2 / 3 * this.width, this.x2 - this.space, this.y1 + 2 / 3 * this.width);
        }
      }
    }
  }

class Square{
  constructor(parent, num, x1, x2, y1, y2, clicked){
    this.parent = parent;
    this.num = num;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.clicked = clicked;
    this.width = abs(x1 - x2);
  }

  show(){
    stroke(220);
    strokeWeight(1);
    square(this.x1 + this.width/10, this.y1 + this.width/10, this.width*0.8);
    if(mouseX <= this.x2 && mouseX >= this.x1 && mouseY <= this.y2 && mouseY >= this.y1){
      fill(255, 210, 180);
    }
    else if(currentGrid == this.parent || currentGrid == 10){
      fill(240, 200, 240);
    }
    else{
      fill(255, 230, 230);
    }
    square(this.x1 + this.width/10, this.y1 + this.width/10, this.width*0.8);
    if(this.clicked == 1){
      stroke(0);
      fill(0);
      textSize(this.width * 0.9);
      text("O", this.x1 + 1.5 * this.width/10, this.y1 + 0.1 * this.width, this.width * 0.9, this.width * 0.9);
    }
    else if(this.clicked == -1){
      stroke(0);
      fill(0);
      textSize(this.width * 0.9);
      text("X", this.x1 + 2 * this.width/10, this.y1 + 0.1 * this.width, this.width * 0.9, this.width * 0.9);
    }
  }

  click(x){
    currentGrid = this.num;
    this.clicked = x;
  }
}

class Grid{
    constructor(winner = 0){
        this.winner = winner;
        this.arr = [[0,0,0],[0,0,0],[0,0,0]];
    }
    check_for_win(){//returns if anybody has won and who. 0 if no one
        if(math.abs(this.arr[0][0] + this.arr[0][1] + this.arr[0][2]) == 3){//this is top row
            return this.arr[0][0] //return one of the winners
        }
        else if(math.abs(this.arr[1][0] + this.arr[1][1] + this.arr[1][2]) == 3){//this is middle row
            return this.arr[1][0] //return one of the winners
        }
        else if(math.abs(this.arr[2][0] + this.arr[2][1] + this.arr[2][2]) == 3){//this is bottom row
            return this.arr[2][0] //return one of the winners
        }
        else if(math.abs(this.arr[0][0] + this.arr[1][1] + this.arr[2][2]) == 3){//this is tl-br diagonal
            return this.arr[0][0]
        }
        else if(math.abs(this.arr[2][0] + this.arr[1][1] + this.arr[0][2]) == 3){// this is the other diagonal
            return this.arr[1][1]
        }
        else if(math.abs(this.arr[0][0] + this.arr[1][0] + this.arr[2][0]) == 3){// column 1
            return this.arr[0][0]
        }
        else if(math.abs(this.arr[0][1] + this.arr[1][1] + this.arr[2][1]) == 3){// column 2
          return this.arr[1][1]
        }
        else if(math.abs(this.arr[0][2] + this.arr[1][2] + this.arr[2][2]) == 3){// column 3
          return this.arr[0][2]
        }
        else{
          return 0 //0 means that nobody won
        }
    }
    move(player, x, y){// increment the board by 1 move
      //player is {-1, 0, 1} denoting who made the move
      //x in {0, 1, 2} denoting x position
      //y in {0, 1, 2} denoting y position
      

    }
}
class BigGrid extends Grid{
    constructor(winner = 0){
        super(winner);
        this.arr = []
        this.

    }
}
function setup() {
  let width = windowWidth / 2;
  let space = width/50;
  let r = createCanvas(width, width);
  for(let i = 0; i < 3; i++){
    for(let x = 0; x < 3; x++){
      let b = new MinorGrid(3*i + x, x * width / 3, (x + 1) * width / 3, i * width / 3, (i + 1) * width / 3, false, space);
      b.drawSquares();
      minGrids.push(b);
    }
  }
}
  
  function draw() {
    background(250);
    stroke(0);
    strokeWeight(4);
    line(0, width / 3, width, width / 3);
    line(0, 2 *  width / 3, width, 2 * width / 3);
    line(width / 3, 0, width / 3, width);
    line( 2* width / 3, 0, 2 * width / 3, width);
    for(var i = 0; i < 9; i++){
      minGrids[i].show();
    }
  }



function checkMajWin(){
  //check rows
  //check columns
  //check diagonals
  for(var i = 0; i < 9; i++){
    minGrids[i].clicked = checkWin(minGrids[i].children);
  }
  return checkWin(minGrids);
}

function checkWin(arr){
  var row1 = arr[0].clicked + arr[1].clicked + arr[2].clicked;
  var row2 = arr[3].clicked + arr[4].clicked + arr[5].clicked;
  var row3 = arr[6].clicked + arr[7].clicked + arr[8].clicked;

  var col1 = arr[0].clicked + arr[3].clicked + arr[6].clicked;
  var col2 = arr[1].clicked + arr[4].clicked + arr[7].clicked;
  var col3 = arr[2].clicked + arr[5].clicked + arr[8].clicked;

  var diag1 = arr[0].clicked + arr[4].clicked + arr[8].clicked;
  var diag2 = arr[2].clicked + arr[4].clicked + arr[6].clicked;

  if(Math.max(row1, row2, row3, col1, col2, col3, diag1, diag2) == 3){
    return 1;
  }
  else if(Math.min(row1, row2, row3, col1, col2, col3, diag1, diag2) == -3){
    return -1;
  }
  else{
    return 0;
  }
}

function mouseClicked(){
  for(var i = 0; i < 9; i++){
    for(var x = 0; x < 9; x++){
      if(mouseX <= minGrids[i].children[x].x2 && mouseX >= minGrids[i].children[x].x1 && mouseY <= minGrids[i].children[x].y2 && mouseY >= minGrids[i].children[x].y1 && (currentGrid == i || currentGrid == 10) && minGrids[i].children[x].clicked == 0){
        minGrids[i].children[x].click(Math.pow(-1, turn));
        turn++;
      }
    }
  }
}