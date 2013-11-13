####俄罗斯方块简单实现
--------------------
http://git.oschina.net/liujiaxingemail/Tetrix/wikis/home

#####思路：

* [画小方块，2D效果](#one)。
* [方块模型，三维数组](#two)。
* [绘制方块，方向颜色](#three)。
* [方块移动，方向变换](#four)。
* [游戏边框，越界判断](#five)。
* [记录方块，满行判断](#six)。
* [界面布局，等级分数](#seven)。

#####实现：

##### <a id="one">画小方块，2D效果。</a>

* 步骤

1. 创建一个继承于QFrame的类TetrixBoard,创建方法
    ```C++
    void TetrixBoard::drawSquare(QPainter &painter, int x, int y, TetrixShape shape){
        QColor color = colorTable[(int)shape];
        //实用颜色填充方块
        painter.fillRect(x + 1 , y + 1 , SquareWidth - 2, SquareHeight -2,color);
        //设置颜色为浅色
        painter.setPen(color.light());
        painter.drawLine(x , y + SquareHeight - 1 ,x , y);
        painter.drawLine(x , y , x + SquareWidth - 1 , y);
        painter.setPen(color.dark());
        //x + 1 y + 1是由于已经存在浅色的线条 -1 表示将像素宽度为1的线条画在方块内部
        painter.drawLine(x + 1, y + SquareHeight - 1,x + SquareWidth - 1 , y + SquareHeight - 1);
        painter.drawLine(x + SquareWidth - 1 , y + SquareHeight -1 ,x + SquareWidth - 1, y + 1);
    
    }
    ```
    * x,y为相对于TetrixBoardz左上角（0,0）的位置，TetrixShape为枚举常量，只是用来在Color数组ColorTable中选取颜色。
    * 首先让出边框，并实用颜色填充。设置填充颜色为浅色笔画小方块的上面横线和左边竖线，深色画笔画右边竖线和底部横线。
    * 这样就可以画出一个宽为SquareWidht，高为SquareHeight的正方型，且看起来有2D效果。
    * 定义好常量之后，可以直接重写paintEvent(QPaintEvent *event)方法中实用，并可以直接实例化TetrixBoard看到效果。

	
	
##### <a id="two">方块模型，三维数组。</a>
* 步骤

1. 创建TetrixPiece类，定义一个静态的static const int coordsTable[8][4][4][4]三位数组，具体参照源码，没有复杂的变化与计算，一目了然。1表示有值，0表示无值，有值才画。
2. TetrixShape枚举一 一对应对于三维数组的8种形状，TetrixDirection为每个方块的四种形状
3. ```C++
    void TetrixPiece::setShape(TetrixShape tetrixShape,TetrixDirection tetrixDirection){
        for(int i = 0; i < 4; i++){
            for(int j = 0; j < 4; j++){
                coords[i][j] = coordsTable[tetrixShape][tetrixDirection][i][j];
            }
        }
    
        pieceShape = tetrixShape;
        pieceDirection = tetrixDirection;
    
    }
    
    void TetrixPiece::setRandomShape(){
        setShape(TetrixShape( qrand() % 7 + 1),TetrixDirection(qrand() % 4));
    }
   ```

    * 当前模型数组int coords[4][4]，根据形状、方向给其赋值。
    * 使用qrand() % 7 可以获取0-6的随机数，piectShape、pieceDirection记录当前属性值。

##### <a id="three">绘制方块，方向颜色。</a>
##### <a id="four">方块移动，方向变换。</a>
##### <a id="five">游戏边框，越界判断。</a>
##### <a id="six">记录方块，满行判断。</a>
##### <a id="seven">界面布局，等级分数</a>