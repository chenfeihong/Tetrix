#include "tetrixwindow.h"
#include "tetrixboard.h"
#include <QApplication>
#include <QHBoxLayout>
#include <QVBoxLayout>
#include <QGridLayout>
#include <QDebug>

TetrixWindow::TetrixWindow()
{
    board = new TetrixBoard();

    QHBoxLayout *layout = new QHBoxLayout;
    layout->addWidget(board);
    setLayout(layout);
    setWindowTitle(tr("Tetrix"));
    resize(320, 620);
}


QLabel *TetrixWindow::createLabel(const QString &text){
    QLabel *label = new QLabel(text);
    label->setAlignment(Qt::AlignCenter);
    return label;
}
