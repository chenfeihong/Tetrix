#ifndef TETRIXWINDOW_H
#define TETRIXWINDOW_H

#include <QWidget>
#include <QLCDNumber>
#include <QPushButton>
#include <QLabel>
#include "tetrixboard.h"

class TetrixWindow : public QWidget
{
    Q_OBJECT
public:
    TetrixWindow(QWidget *parent = 0);

private:
    QLabel *createLable(const QString &text);

    TetrixBoard *board;
    QLabel *nextPieceLabel;
    QLCDNumber *levelLcd;
    QLCDNumber *scoreLcd;
    QPushButton *startButton;
    QPushButton *quitButton;

};

#endif // TETRIXWINDOW_H
