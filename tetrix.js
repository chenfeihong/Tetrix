var shapes = [
    //IShape
    [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
     [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
     [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
     [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]],
    //OShape
    [[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
     [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
     [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
     [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]]],
    //TShape
    [[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
     [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
     [[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
     [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],
    //LShape
    [[[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
     [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
     [[1,0,0,0],[1,0,0,0],[1,1,0,0],[0,0,0,0]],
     [[1,1,1,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]]],
    //JShape
    [[[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]],
     [[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
     [[1,1,0,0],[1,0,0,0],[1,0,0,0],[0,0,0,0]],
     [[1,1,1,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]]],
    //SShape
    [[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
     [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
     [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
     [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]]],
    //ZShape
    [[[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]],
     [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
     [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]],
     [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]
];

var colors = ['#CC6666', '#66CC66', '#6666CC','#CCCC66', '#CC66CC', '#66CCCC', '#DAAA00'];
var gameBoard = null;
var next = null;
var squareWidth = 20;
var squareHeight = 20;
var row = 18;
var column = 10;
var timer = null;
var coords = null;

function Shape(){ //形状对象  伪类
	this.x = 0;
	this.y = 0;
	this.shape = null;
	this.color = null;
	this.index = null;
	this.direction = null;
	this.maxX = function(){  //形状的最大宽度,用于边界判断 --7
		if(!this.shape){return null;};
		var count = 0;
		for(var x = 0; x < 4; x++){
			for(var y = 0; y < 4; y++){
				if(this.shape[x][y] != 0){
					++count;
					break;
				}
			}
		}
		return count;
	};
	this.maxY = function(){  //形状的最大高度,,用于边界判断 --6
		if(!this.shape){return null;};
		var count = 0;
		for(var x = 0; x < 4; x++){
			for(var y = 0; y < 4; y++ ){
				if(this.shape[y][x] != 0){
					++count;
					break;
				}
			}
		}
		return count;
	};
	this.marginLeft = function(){	//模型左边的空列数
		if(!this.shape){return null;};
		var count = 0;
		for(var x = 0; x < 4; x++){
			var blankCell = 0;
			for(var y = 0; y < 4; y++ ){
				if(this.shape[x][y] == 0){
					++blankCell;
				}
			}
			if(blankCell == 4){
				++count;
			}else{
				break;
			}
		}
		return count;
	};
	this.marginTop = function(){	//模型顶部的空行数
		if(!this.shape){return null;};
		var count = 0;
		for(var x = 0; x < 4; x++){
			var blankCell = 0;
			for(var y = 0; y < 4; y++ ){
				if(this.shape[y][x] == 0){
					++blankCell;
				}
			}
			if(blankCell == 4){
				++count;
			}else{
				break;
			}
		}
		return count;
	};
	this.toString = function(){
		return "[x : "+this.x+" y:"+this.y+" maxX:"+this.maxX()+" maxY:"+this.maxY()+" marginLeft:"+this.marginLeft()+" marginTop:"+this.marginTop()+"]";
	};
}

var currentShape = null;
var nextShape = null;

//绘制游戏主面板 -- 1
function drawBoard(board,squareWidth,squareHeight,row,column){
	board.style.width = (squareWidth * column) + 'px';  
	board.style.height = (squareHeight * row) + 'px';
	for(var i = 0; i < row; i++){
		var tr = board.appendChild(document.createElement('tr'));
		tr.id = "tr"+board.id+i;
		for(var j = 0; j < column; j++){
			var td = tr.appendChild(document.createElement('td'));
			td.id = "td"+board.id+j;
			td.style.width = squareWidth;
			td.style.height = squareHeight;
		}
	}
}

//绘制单个格的背景 -- 2
function drawCell(board,x,y,color){
 	var tr = document.getElementById("tr"+board.id+y);
	if(!tr){return;};
	var cell = tr.cells[x];
	cell.style.backgroundColor = color;
	cell.style.width = squareWidth;
	cell.style.height = squareHeight;
	cell.className = 'square';
}

//绘制一个完整的图形 --3
function drawSquare(board,selectedShape){
	if(!selectedShape) return;
	for(var x = 0; x < 4; x++){
		for(var y = 0; y < 4; y++ ){
			if(selectedShape.shape[x][y] != 0){
				//一个方块的位置是由Board左上角(0,0),然后是selectedShape的左上角位置决定
				drawCell(board,x - selectedShape.marginLeft() + selectedShape.x,y - selectedShape.marginTop() + selectedShape.y ,selectedShape.color);
			}
		}
	}
}

//移动方法 --4
function tryMove(shape,newX,newY){
	var flag = hit(shape,newX,newY);
	if(!flag){return false;};
	shape.x = newX;
	shape.y = newY;
	currentShape = shape;
	return true;
}

//碰撞
function hit(shape,newX,newY){
	newX = newX || shape.x;
	newY = newY || shape.y;
	//越界判断
	if(newX < 0){return false;};
	//右边、下边越界
	if(newX + shape.maxX() > column){
		return false;
	}else if(newY + shape.maxY() > row){
		return false;
	}else{
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(newY + j - shape.marginTop() < 0){ continue}; //方块的起始位置为负
				if(shape.shape[i][j] != 0 && coords[newY + j - shape.marginTop()][newX + i - shape.marginLeft()]){
					return false;
				}
			}
		}
	}
	return true;
}

//全局键盘事件监听 -- 5
document.onkeydown = function(e){
	if(currentShape == null){return;};
	if(e.keyCode == 37){		//left
		tryMove(currentShape,currentShape.x - 1,currentShape.y);
	}else if(e.keyCode == 38){	//up
		trunRight(currentShape);
	}else if(e.keyCode == 39){	//right
		tryMove(currentShape,currentShape.x + 1,currentShape.y);
	}else if(e.keyCode == 40){	//down
		moveDown();
	}
	//刷新重绘
	update();
}

//向下移动
function moveDown(){
	if(!tryMove(currentShape,currentShape.x,currentShape.y + 1)){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(currentShape.y + j - currentShape.marginTop() < 0){ return;} //无法移动
				if(currentShape.shape[i][j] != 0){
					coords[currentShape.y + j - currentShape.marginTop()][currentShape.x + i - currentShape.marginLeft()] = currentShape.color;
				}
			}
		}
		removeFullLines();
		currentShape = nextShape;
		currentShape.x = column/2 - 1;
		currentShape.y =  -2;
		nextShape = createShape();
	}
	update();
}

//向右旋转
function trunRight(){
	var shape = new Shape();
	shape.x = currentShape.x;
	shape.y = currentShape.y;
	shape.index = currentShape.index;
	shape.direction = currentShape.direction;
	shape.color = currentShape.direction;
	
	shape.direction = shape.direction - 1 < 0 ? 3 : shape.direction - 1;
	shape.shape = shapes[shape.index][shape.direction];
	shape.color = colors[shape.index];
	if(!hit(shape)){return false;};
	currentShape = shape;
	return true;
}

//删除满行
function removeFullLines(){
	var count = 0;
	for(var i = row - 1; i >= 0; i--){
		var c = 0;
		for(var j = column - 1; j >= 0 ; j--){
			coords[i+count][j] = coords[i][j];
			if(coords[i][j]){++c;};
		}
		if(c == column){
			++count;
			for(var j = column - 1; j >= 0 ; j--){
				coords[i][j] = '';
			}
		};
	}
}

//擦除所有然后重新绘制 --8
function update(){
	var tds = document.getElementsByTagName('td');
	for(var i = 0; i < tds.length; i++){
		tds[i].className = '';
		tds[i].style.backgroundColor = '';
	}
	//绘制保存的cell
	for(var i = 0; i < row; i++){
		for(var j = 0; j < column; j++){
			var color = coords[i][j];
			if(color){
				drawCell(gameBoard,j,i,color);
			}
		}
	}
	//绘制当前的Shape
	drawSquare(gameBoard,currentShape);
	drawSquare(next,nextShape);
}

//创建
function createShape(){
	var newShape = new Shape();
	newShape.index = Math.floor(Math.random() * 7);
	newShape.direction = Math.floor(Math.random() * 4);
	newShape.shape = shapes[newShape.index][newShape.direction];
	newShape.color = colors[newShape.index];
	newShape.x = 0;
	newShape.y = 0;
	return newShape;
}

function init(){
	coords = new Array(row);//存放不能移动的方块
	for(var i = 0; i < coords.length; i++){
		coords[i] = new Array(column);
	}
	if(gameBoard == null || next == null){
		gameBoard = document.getElementById("board");
		next = document.getElementById("next");
		drawBoard(gameBoard,squareWidth,squareHeight,row,column);
		drawBoard(next,squareWidth,squareHeight,4,4);
	}	
	nextShape = createShape();
	currentShape = createShape();
	currentShape.x = column/2 - 1;
	currentShape.y =  -2;
	drawSquare(gameBoard,currentShape);
	drawSquare(next,nextShape);
	timer = setInterval("moveDown()",300);
}
//重新开始
function restart(){
	var tds = document.getElementsByTagName('td');
	for(var i = 0; i < tds.length; i++){
		tds[i].className = '';
		tds[i].style.backgroundColor = '';
	}
	currentShape = null;
	nextShape = null;
	coords = null;
	init();
}

function pause(obj){
	if(obj.value == "Pause"){
		clearInterval(timer);
		obj.value = "Start";
	}else{
		timer = setInterval("moveDown()",300);
		obj.value = "Pause";
	}
}

window.onload = function(){
  init();
}
