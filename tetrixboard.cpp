#include "tetrixboard.h"
#include "tetrixpiece.h"

#include <QPainter>

static const QRgb colorTable[8] = {
    0x000000, 0xCC6666, 0x66CC66, 0x6666CC,
    0xCCCC66, 0xCC66CC, 0x66CCCC, 0xDAAA00
};

TetrixBoard::TetrixBoard(QWidget *parent) :
    QFrame(parent)
{
}

void TetrixBoard::paintEvent(QPaintEvent *event){

    QFrame::paintEvent(event);

    QPainter painter(this);
    drawSquare(painter,0,0,SShape);

}

/**
 * @brief TetrixBoard::drawSquare
 * @param painter
 * @param x
 * @param y
 * @param shape
 * 根据当前位置画出一个方块
 */
void TetrixBoard::drawSquare(QPainter &painter, int x, int y, TetrixShape shape){
    QColor color = colorTable[(int)shape];
    //实用颜色填充方块
    painter.fillRect(x + 1 , y + 1 , x + squareWidth() - 2, y + squareHeight() -2,color);
    //设置颜色为浅色
    painter.setPen(color.light());
    painter.drawLine(x , y + squareWidth() - 1 ,x , y);
    painter.drawLine(x , y , x + squareHeight() - 1 , y);
    painter.setPen(color.dark());
    //x + 1 y + 1是由于已经存在浅色的线条 -1 表示将像素宽度为1的线条画在方块内部
    painter.drawLine(x + 1, y + squareHeight() - 1,x + squareWidth() - 1 , y + squareHeight() - 1);
    painter.drawLine(x + squareWidth() - 1 , y + squareHeight() -1 ,x + squareWidth() - 1, y + 1);

}
