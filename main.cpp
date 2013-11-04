#include <QApplication>
#include <stdlib.h>
#include <QDebug>
#include <QTime>
#include "tetrixboard.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

    //初始化随机数种子
    qsrand(QTime(0,0,0).secsTo(QTime::currentTime()));

    TetrixBoard board;
    board.setFixedSize(400,460);
    board.show();

    return app.exec();
}
