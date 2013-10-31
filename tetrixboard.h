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
    void keyPressEvent(QKeyEvent *event);
private:
    //定义方块活动窗体的列数、行数
    enum {BoardWidth = 10 ,BoardHeight = 22};
    //画出一个方块
    void drawSquare(QPainter &painter,int x,int y,TetrixShape shape);
    //移动方法
    bool tryMove(const TetrixPiece &newPiece,int newX,int newY);
    //根据游戏窗体大小、和行列数计算出每个方块的长度和宽度
    int squareWidth(){return contentsRect().width()/BoardWidth;}
    int squareHeight(){return contentsRect().height()/BoardHeight;}

    //当前活动的形状
    TetrixPiece currentPiece;
    //当前X y
    int curX;
    int curY;

};

#endif // TETRIXBOARD_H
