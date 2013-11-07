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
    TetrixWindow();

private:
    QLabel *createLabel(const QString &text);

    TetrixBoard *board;


};

#endif // TETRIXWINDOW_H
