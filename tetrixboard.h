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
    enum {BoardWidth = 10 ,BoardHeight = 11};
    //画出一个方块
    void drawSquare(QPainter &painter,int x,int y,TetrixShape shape);
    //移动方法
    bool tryMove(const TetrixPiece &newPiece,int newX,int newY);
    //根据游戏窗体大小、和行列数计算出每个方块的长度和宽度
    int squareWidth(){return contentsRect().width()/BoardWidth;}
    int squareHeight(){return contentsRect().height()/BoardHeight;}
    //向下落height的高度，将值存储到coordsBoard
    void pieceDroped(int height);
    TetrixShape &shapeAt(int x, int y){return coordsBoard[x][y];}
    void clearBoard();
    TetrixPiece currentPiece;
    TetrixPiece nextPiece;
    void newPiece();
    int curX;
    int curY;
    TetrixShape coordsBoard[BoardWidth + 1][BoardHeight + 1];

};

#endif // TETRIXBOARD_H
