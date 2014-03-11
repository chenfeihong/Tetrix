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
var coords = new Array(row);//��Ų����ƶ��ķ���
for(var i = 0; i < coords.length; i++){
	coords[i] = new Array(column);
}

function Shape(){ //��״����	
	this.x = 0,
	this.y = 0,
	this.shape = null,
	this.color = null,
	this.index = null,
	this.direction = null,
	this.maxX = function(){  //��״�������,���ڱ߽��ж� --7
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
	this.maxY = function(){  //��״�����߶�,,���ڱ߽��ж� --6
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
	this.marginLeft = function(){	//ģ����ߵĿ�����
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
	this.marginTop = function(){	//ģ�Ͷ����Ŀ�����
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

//������Ϸ����� -- 1
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

//���Ƶ�����ı��� -- 2
function drawCell(x,y,color){
 	var tr = document.getElementById("tr"+y);
	var cell = tr.cells[x];
	cell.style.backgroundColor = color;
	cell.style.width = squareWidth;
	cell.style.height = squareHeight;
	cell.className = 'square';
}

//����һ��������ͼƬ --3
function drawSquare(selectedShape){
	if(!selectedShape) return;
	for(var x = 0; x < 4; x++){
		for(var y = 0; y < 4; y++ ){
			if(selectedShape.shape[x][y] != 0){
				//console.log("left:"+selectedShape.marginLeft() + "; top:"+selectedShape.marginTop());
				//һ�������λ������Board���Ͻ�(0,0),Ȼ����selectedShape�����Ͻ�λ�þ���
				drawCell(x - selectedShape.marginLeft() + selectedShape.x,y - selectedShape.marginTop() + selectedShape.y ,selectedShape.color);
			}
		}
	}
}

//�ƶ����� --4
function tryMove(){
	//Խ���ж�
	currentShape.x = currentShape.x < 0 ? currentShape.x += 1 : currentShape.x;
	currentShape.y = currentShape.y < 0 ? currentShape.y += 1 : currentShape.y;
	//�ұߡ��±�Խ��
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

//�������0-seed���ǲ�����seed��������
function randomNumber(seed){
	if(!seed) return -1;
	return Math.floor(Math.random() * seed);
}

//��ѯ�ô��Ƿ��Ѿ����ڷ���
function shapeAt(x,y){
	//console.log(x+" "+y);
	var color = coords[x][y];
	if(color){
		return true;
	}else{
		return false;
	}
}

//ȫ�ּ����¼����� -- 5
document.onkeydown = function(e){
	if(currentShape == null){return;};
	if(e.keyCode == 37){		//left
		currentShape.x -= 1;
	}else if(e.keyCode == 38){	//up
		//��ת����
		currentShape.direction = currentShape.direction - 1 < 0 ? 3 : currentShape.direction - 1;
		currentShape.shape = shapes[currentShape.index][currentShape.direction];
		currentShape.color = colors[currentShape.index];
	}else if(e.keyCode == 39){	//right
		currentShape.x += 1;
	}else if(e.keyCode == 40){	//down
		currentShape.y += 1;
	}
	if(!tryMove()){	//�޷��ƶ��򽫵�ǰShape��ֵ��ȫ�ֵĶ�ά����
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
	//ˢ���ػ�
	update();
}

//��������Ȼ�����»��� --8
function update(){
	var tds = document.getElementsByTagName('td');
	for(var i = 0; i < tds.length; i++){
		tds[i].className = '';
		tds[i].style.backgroundColor = '';
	}
	//���Ʊ����cell
	for(var i = 0; i < row; i++){
		for(var j = 0; j < column; j++){
			var color = coords[i][j];
			if(color){
				drawCell(j,i,color);
			}
		}
	}
	//���Ƶ�ǰ��Shape
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
