#include "tetrixwindow.h"
#include "tetrixboard.h"
#include <QApplication>
#include <QHBoxLayout>
#include <QVBoxLayout>
#include <QGridLayout>

TetrixWindow::TetrixWindow(QWidget *parent) :
    QWidget(parent)
{
    board = new TetrixBoard(this);

    //显示下一个出现的方块
    nextPieceLabel =  new QLabel(this);
    nextPieceLabel->setFrameStyle(QFrame::Box | QFrame::Raised);
    nextPieceLabel->setAlignment(Qt::AlignCenter);
    board->setNextPieceLabel(nextPieceLabel);

    levelLcd = new QLCDNumber(5);
    levelLcd->setSegmentStyle(QLCDNumber::Filled);
    scoreLcd = new QLCDNumber(5);
    levelLcd->setSegmentStyle(QLCDNumber::Filled);

    startButton = new QPushButton(tr("&Start"),this);
    quitButton = new QPushButton(tr("&Quit"),this);

    connect(startButton,SIGNAL(clicked()),board,SLOT(start()));
    connect(quitButton,SIGNAL(clicked()),qApp,SLOT(quit()));

    QVBoxLayout *layoutV = new QVBoxLayout();
    layoutV->addWidget(createLable(tr("NEXT")));
    layoutV->addWidget(nextPieceLabel);
    layoutV->addWidget(createLable(tr("LEVEL")));
    layoutV->addWidget(levelLcd);
    layoutV->addWidget(createLable(tr("SCORE")));
    layoutV->addWidget(scoreLcd);
    layoutV->addWidget(startButton);
    layoutV->addWidget(quitButton);

    QHBoxLayout *layout = new QHBoxLayout();
    layout->addWidget(board);
    layout->addLayout(layoutV);
    setLayout(layout);

    setWindowTitle(tr("Tetrix"));
}


QLabel *TetrixWindow::createLable(const QString &text){
    QLabel *label = new QLabel(text);
    label->setAlignment(Qt::AlignCenter);
    return label;
}
