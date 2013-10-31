#include "tetrixboard.h"
#include "tetrixpiece.h"

#include <QPainter>
#include <QDebug>
#include <QKeyEvent>

static const QRgb colorTable[8] = {
    0x000000, 0xCC6666, 0x66CC66, 0x6666CC,
    0xCCCC66, 0xCC66CC, 0x66CCCC, 0xDAAA00
};

TetrixBoard::TetrixBoard(QWidget *parent) :
    QFrame(parent)
{
    currentPiece.setShape(LShape,UP);
    curX = 0;
    curY = 0;
}

void TetrixBoard::paintEvent(QPaintEvent *event){

    QFrame::paintEvent(event);
    QPainter painter(this);
    //画出一个形状
    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            if(currentPiece.value(i,j) == 0){
                continue;
            }
            int x = (i + curX) * squareWidth();
            int y = (j + curY) * squareHeight();
            drawSquare(painter,y,x,currentPiece.shape());
        }
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
        tryMove(currentPiece,curX,curY+1);
        break;
    case Qt::Key_Up:
        tryMove(currentPiece,curX,curY-1);
    default:
        QFrame::keyPressEvent(event);
    }
}

/**
 * @brief TetrixBoard::tryMove  移动
 * @param newPiece
 * @param newX
 * @param newY
 * @return
 */
bool TetrixBoard::tryMove(const TetrixPiece &newPiece, int newX, int newY){
    currentPiece = newPiece;
    curX = newX;
    curY = newY;
    update();
    return true;
}

/**
 * @brief TetrixBoard::drawSquare
 * @param painter
 * @param x 当前位置x坐标
 * @param y 当前位置y坐标
 * @param shape 该形状只是用来确定颜色值
 * 根据当前位置画出一个方块
 */
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
