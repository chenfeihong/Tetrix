#include <QApplication>
#include <stdlib.h>
#include <QDebug>
#include <QTime>
#include "tetrixwindow.h"
#include "tetrixboard.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

//    TetrixWindow window;
//    window.resize(800,460);
//    window.show();

    TetrixBoard board;
    board.setFixedSize(400,400);
    board.start();
    board.show();

    //初始化随机数种子
    qsrand(QTime(0,0,0).secsTo(QTime::currentTime()));

    return app.exec();
}
