#ifndef TETRIXBOARD_H
#define TETRIXBOARD_H

#include <QFrame>
#include <QPainter>

#include "tetrixpiece.h"

class TetrixBoard : public QFrame
{
    Q_OBJECT
public:
    TetrixBoard(QWidget *parent = 0);

protected:
    void paintEvent(QPaintEvent *event);

private:
    //定义方块活动窗体的列数、行数
    enum {BoardWidth = 10 ,BoardHeight = 22};
    //画出一个方块
    void drawSquare(QPainter &painter,int x,int y,TetrixShape shape);
    int squareWidth(){return contentsRect().width()/BoardWidth;}
    int squareHeight(){return contentsRect().height()/BoardHeight;}

};

#endif // TETRIXBOARD_H
