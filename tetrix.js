var shapes = [
    //IShape
    [
        [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]
    ],
    //OShape
    [
        [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
        [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
        [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
        [[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
    ],
    //TShape
    [
        [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
        [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
        [[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
        [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
    ],
    //LShape
    [
        [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
        [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
        [[1,0,0,0],[1,0,0,0],[1,1,0,0],[0,0,0,0]],
        [[1,1,1,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]],
    ],
    //JShape
    [
        [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]],
        [[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
        [[1,1,0,0],[1,0,0,0],[1,0,0,0],[0,0,0,0]],
        [[1,1,1,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]],
    ],
    //SShape
    [
        [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
        [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
        [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
        [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
    ],
    //ZShape
    [
        [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]],
        [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
        [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]],
        [[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
    ]
];

var colors = ['#CC6666', '#66CC66', '#6666CC',
    '#CCCC66', '#CC66CC', '#66CCCC', '#DAAA00'
];

var board = null;
var squareWidth = 20;
var squareHeight = 20;
var row = 18;
var column = 10;
var coords = new Array(row);//存放不能移动的方块
for(var i = 0; i < coords.length; i++){
	coords[i] = new Array(column);
}

function Shape(){ //形状对象	
	this.x = 0,
	this.y = 0,
	this.shape = null,
	this.color = null,
	this.index = null,
	this.direction = null,
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
	},
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
	},
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
	},
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
	}
}

var currentShape = null;
var nextShape = null;

//绘制游戏主面板 -- 1
function drawBoard(squareWidth,squareHeight,row,column){
	board.style.width = (squareWidth * column) + 'px';  
	board.style.height = (squareHeight * row) + 'px';
	for(var i = 0; i < row; i++){
		var tr = board.appendChild(document.createElement('tr'));
		tr.id = "tr"+i;
		for(var j = 0; j < column; j++){
			var td = tr.appendChild(document.createElement('td'));
			td.id = "td"+j;
			td.style.width = squareWidth;
			td.style.height = squareHeight;
		}
	}
}

//绘制单个格的背景 -- 2
function drawCell(x,y,color){
 	var tr = document.getElementById("tr"+y);
	var cell = tr.cells[x];
	cell.style.backgroundColor = color;
	cell.style.width = squareWidth;
	cell.style.height = squareHeight;
	cell.className = 'square';
}

//绘制一个完整的图片 --3
function drawSquare(selectedShape){
	if(!selectedShape) return;
	for(var x = 0; x < 4; x++){
		for(var y = 0; y < 4; y++ ){
			if(selectedShape.shape[x][y] != 0){
				//console.log("left:"+selectedShape.marginLeft() + "; top:"+selectedShape.marginTop());
				//一个方块的位置是由Board左上角(0,0),然后是selectedShape的左上角位置决定
				drawCell(x - selectedShape.marginLeft() + selectedShape.x,y - selectedShape.marginTop() + selectedShape.y ,selectedShape.color);
			}
		}
	}
}

//移动方法 --4
function tryMove(){
	//越界判断
	currentShape.x = currentShape.x < 0 ? currentShape.x += 1 : currentShape.x;
	currentShape.y = currentShape.y < 0 ? currentShape.y += 1 : currentShape.y;
	//右边、下边越界
	console.log("y: "+ currentShape.y);
	console.log("width: "+ currentShape.maxX() + "; height: " + currentShape.maxY());
	if(currentShape.x + currentShape.maxX() > column){
		currentShape.x -= 1;
		return false;
	}
	if(currentShape.y + currentShape.maxY() > row){
		currentShape.y -= 1;
		return false;
	}
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(shapeAt(currentShape.x - currentShape.marginLeft() + i,currentShape.y - currentShape.marginTop() + j)){
				return false;
			}
		}
	}
	return true;
}

//产生随机0-seed但是不包含seed的整数。
function randomNumber(seed){
	if(!seed) return -1;
	return Math.floor(Math.random() * seed);
}

//查询该处是否已经存在方块
function shapeAt(x,y){
	//console.log(x+" "+y);
	var color = coords[x][y];
	if(color){
		return true;
	}else{
		return false;
	}
}

//全局键盘事件监听 -- 5
document.onkeydown = function(e){
	if(currentShape == null){return;};
	if(e.keyCode == 37){		//left
		currentShape.x -= 1;
	}else if(e.keyCode == 38){	//up
		//旋转向右
		currentShape.direction = currentShape.direction - 1 < 0 ? 3 : currentShape.direction - 1;
		currentShape.shape = shapes[currentShape.index][currentShape.direction];
		currentShape.color = colors[currentShape.index];
	}else if(e.keyCode == 39){	//right
		currentShape.x += 1;
	}else if(e.keyCode == 40){	//down
		currentShape.y += 1;
	}
	if(!tryMove()){	//无法移动则将当前Shape赋值给全局的二维数组
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(currentShape.shape[i][j] != 0){
					//console.log((currentShape.x + i) + " " + (currentShape.y + j));
					coords[currentShape.y + j][currentShape.x + i] = currentShape.color;
				}
			}
		}
		currentShape = nextShape;
		nextShape = createShape();	
	}
	//刷新重绘
	update();
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
				drawCell(j,i,color);
			}
		}
	}
	//绘制当前的Shape
	drawSquare(currentShape);
}

function createShape(){
	var newShape = new Shape();
	newShape.index = randomNumber(7);
	newShape.direction = randomNumber(4);
	newShape.shape = shapes[newShape.index][newShape.direction];
	newShape.color = colors[newShape.index];
	return newShape;
}

window.onload = function(){
    board = document.getElementById("board");
	drawBoard(squareWidth,squareHeight,row,column);
	nextShape = createShape();
	currentShape = createShape();
	drawSquare(currentShape);
}
