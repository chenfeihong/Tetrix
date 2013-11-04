#ifndef TETRIXBOARD_H
#define TETRIXBOARD_H

#include <QFrame>
#include <QPainter>
#include <QBasicTimer>

#include "tetrixpiece.h"

class TetrixBoard : public QFrame
{
    Q_OBJECT
public:
    TetrixBoard(QWidget *parent = 0);

public slots:
    void pause();

protected:
    void paintEvent(QPaintEvent *event);
    void keyPressEvent(QKeyEvent *event);
    void timerEvent(QTimerEvent *event);
private:
    //定义方块活动窗体的列数、行数
    enum {BoardWidth = 20 ,BoardHeight = 23};
    //画出一个方块
    void drawSquare(QPainter &painter,int x,int y,TetrixShape shape);
    //移动方法
    bool tryMove(const TetrixPiece &newPiece,int newX,int newY);
    //根据游戏窗体大小、和行列数计算出每个方块的大小
    int squareWidth(){return contentsRect().width()/BoardWidth;}
    int squareHeight(){return contentsRect().height()/BoardHeight;}
    //向下落height的高度，将值存储到coordsBoard
    void pieceDroped(int height);
    TetrixShape &shapeAt(int x, int y){return coordsBoard[x][y];}
    void newPiece();
    void clearBoard();
    void removeFullLines();
    void dropDown();

    TetrixPiece currentPiece;
    TetrixPiece nextPiece;
    int curX;
    int curY;
    bool isPaused;
    TetrixShape coordsBoard[BoardWidth][BoardHeight];
    QBasicTimer timer;
};

#endif // TETRIXBOARD_H
