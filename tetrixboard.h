#ifndef TETRIXBOARD_H
#define TETRIXBOARD_H

#include <QFrame>
#include <QPainter>
#include <QBasicTimer>
#include <QLabel>
#include <QPointer>

#include "tetrixpiece.h"

class TetrixBoard : public QFrame
{
    Q_OBJECT
public:
    TetrixBoard(QWidget *parent = 0);
    void setNextPieceLabel(QLabel *label);

public slots:
    void pause();
    void start();

protected:
    void paintEvent(QPaintEvent *event);
    void keyPressEvent(QKeyEvent *event);
    void timerEvent(QTimerEvent *event);

private:
    //定义方块活动窗体的列数、行数
    enum {BoardWidth = 15 ,BoardHeight = 30};
    //画出一个方块
    void drawSquare(QPainter &painter,int x,int y,TetrixShape shape);
    //移动方法
    bool tryMove(const TetrixPiece &newPiece,int newX,int newY);
    int squareWidth(){return contentsRect().width() /BoardWidth;}
    int squareHeight(){return contentsRect().height() /BoardHeight;}
    void pieceDroped();
    TetrixShape &shapeAt(int x, int y){return coordsBoard[x][y];}
    void newPiece();
    void clearBoard();
    void removeFullLines();
    void dropDown();
    void showNextPiece();

    TetrixPiece currentPiece;
    TetrixPiece nextPiece;
    QPointer<QLabel> nextPieceLabel;
    int curX;
    int curY;
    bool isPaused;
    TetrixShape coordsBoard[BoardWidth][BoardHeight];
    QBasicTimer timer;
};

#endif // TETRIXBOARD_H
