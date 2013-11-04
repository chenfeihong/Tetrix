#include "tetrixboard.h"
#include "tetrixpiece.h"

#include <QPainter>
#include <QDebug>
#include <QKeyEvent>
#include <QTimerEvent>

//颜色的数序与定义的形状顺序一直
static const QRgb colorTable[8] = {
    0x000000, 0xCC6666, 0x66CC66, 0x6666CC,
    0xCCCC66, 0xCC66CC, 0x66CCCC, 0xDAAA00
};

TetrixBoard::TetrixBoard(QWidget *parent) :
    QFrame(parent)
{

    clearBoard();
    currentPiece.setRandomShape();
    curX = BoardWidth / 2 - 1;
    curY = -1;
    timer.start(1000/2,this);
    isPaused = false;
}

void TetrixBoard::paintEvent(QPaintEvent *event){

    QFrame::paintEvent(event);
    QPainter painter(this);

    //画出已经存在的形状
    for(int i = 0; i < BoardHeight; i++){
        for(int j = 0; j < BoardWidth; j++){
            TetrixShape shape = shapeAt(j,i);
            if(shape != NOShape){
                drawSquare(painter,j * squareWidth(),i * squareHeight(),shape );
            }
        }
    }

    //画出当前的一个形状
    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            if(currentPiece.value(i,j) == 0){
                continue;
            }
            int x = (j + curX) * squareWidth();
            int y = (i + curY) * squareHeight();
            drawSquare(painter,x,y,currentPiece.shape());
        }
    }

    //暂停
    if(isPaused){
        painter.drawText(contentsRect(),Qt::AlignCenter,tr("Pause"));
        return;
    }

 }

void TetrixBoard::keyPressEvent(QKeyEvent *event){
    switch(event->key()){
    case Qt::Key_Left:
        tryMove(currentPiece,curX - 1,curY);
        break;
    case Qt::Key_Right:
        tryMove(currentPiece,curX + 1,curY);
        break;
    case Qt::Key_Down:
        if(!tryMove(currentPiece,curX,curY+1)){
            pieceDroped();
        }
        break;
    case Qt::Key_P:
        pause();
        break;
    case Qt::Key_A:
        tryMove(currentPiece.rotateLeft(),curX,curY);
        break;
    case Qt::Key_D:
        tryMove(currentPiece.rotateRight(),curX,curY);
        break;
    case Qt::Key_Space:
        dropDown();
        break;
    default:
        //事件传递
        QFrame::keyPressEvent(event);
    }
}

void TetrixBoard::timerEvent(QTimerEvent *event){
    if(timer.timerId() == event->timerId()){
        if(!tryMove(currentPiece,curX,curY+1)){
            pieceDroped(0);
        }
    }else{
        QFrame::timerEvent(event);
    }
}

void TetrixBoard::dropDown(){
    int newY = curY;
    while(newY < BoardHeight){
        if(!tryMove(currentPiece,curX,curY+1)){
            break;
        }
        ++newY;
    }
    pieceDroped();
}

void TetrixBoard::pieceDroped(){
    //无法移动，则根据当前位置将方块赋值到board
    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            if(currentPiece.value(i,j) == 0){
                continue;
            }
            shapeAt(j + curX,i  + curY) = currentPiece.shape();
        }
    }
    removeFullLines();
    newPiece();
}

void TetrixBoard::removeFullLines(){

    for(int i = 0; i < BoardHeight; i++){
        bool isFullLine = true;
        for(int j = 0; j < BoardWidth; j++){
            if(shapeAt(j,i) == NOShape){
                isFullLine = false;
                break;
            }
        }
        if(isFullLine){
            //消除当前的满行
            for(int j = 0; j < BoardWidth; j++){
                shapeAt(j,i) = NOShape;
            }
            //将上一行的数据向下移动一行
            for(int k = i; k > 0; k--){
                for(int j = 0; j < BoardWidth; j++){
                    shapeAt(j,k) = shapeAt(j,k - 1);
                }
            }
        }
    }
    update();
}

void TetrixBoard::newPiece(){
    nextPiece.setRandomShape();
    currentPiece = nextPiece;
    curX = BoardWidth / 2 - 1;
    curY = -1;
}

void TetrixBoard::clearBoard(){
    for(int i = 0; i < BoardHeight; i++){
        for(int j = 0; j < BoardWidth; j++){
            coordsBoard[j][i] = NOShape;
        }
    }
}

//暂停
void TetrixBoard::pause(){
    isPaused = !isPaused;
    if(isPaused){
        timer.stop();
    }else{
        timer.start(1000/2,this);
    }
    update();
}

bool TetrixBoard::tryMove(const TetrixPiece &newPiece, int newX, int newY){
    //newPiece 由const 修饰，则只能访问实用const 修饰的成员函数或者方法
    //判断是否超出边界
    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            //如果模型中的值为零，则不画
            if(newPiece.value(i,j) == 0){
                continue;
            }
            //是否越界
            if((i + newY) >= BoardHeight){
                return false;
            }else if((j + newX) >= BoardWidth || (j + newX) < 0){
                return false;
            }else if(shapeAt(j + newX , i + newY) != NOShape){
                return false;
            }
        }
    }

    currentPiece = newPiece;
    curX = newX;
    curY = newY;
    update();
    return true;
}

void TetrixBoard::drawSquare(QPainter &painter, int x, int y, TetrixShape shape){
    QColor color = colorTable[(int)shape];
    //实用颜色填充方块
    painter.fillRect(x + 1 , y + 1 , squareWidth() - 2, squareHeight() -2,color);
    //设置颜色为浅色
    painter.setPen(color.light());
    painter.drawLine(x , y + squareWidth() - 1 ,x , y);
    painter.drawLine(x , y , x + squareHeight() - 1 , y);
    painter.setPen(color.dark());
    //x + 1 y + 1是由于已经存在浅色的线条 -1 表示将像素宽度为1的线条画在方块内部
    painter.drawLine(x + 1, y + squareHeight() - 1,x + squareWidth() - 1 , y + squareHeight() - 1);
    painter.drawLine(x + squareWidth() - 1 , y + squareHeight() -1 ,x + squareWidth() - 1, y + 1);

}

