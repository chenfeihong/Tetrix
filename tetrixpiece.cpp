#include <QtCore>
#include "tetrixpiece.h"
#include "stdlib.h"

//形状 状态 y x  使用的4X4的模型定义每个方块的四种形态
static const int coordsTable[8][4][4][4] = {
    //NOShape
    {
        {{0,0,0,0},{0,0,0,0},{0,0,0,0},{0,0,0,0}},
        {{0,0,0,0},{0,0,0,0},{0,0,0,0},{0,0,0,0}},
        {{0,0,0,0},{0,0,0,0},{0,0,0,0},{0,0,0,0}},
        {{0,0,0,0},{0,0,0,0},{0,0,0,0},{0,0,0,0}}
    },
    //IShape
    {
        {{1,0,0,0},{1,0,0,0},{1,0,0,0},{1,0,0,0}},
        {{1,1,1,1},{0,0,0,0},{0,0,0,0},{0,0,0,0}},
        {{1,0,0,0},{1,0,0,0},{1,0,0,0},{1,0,0,0}},
        {{1,1,1,1},{0,0,0,0},{0,0,0,0},{0,0,0,0}}
    },
    //OShape
    {
        {{1,1,0,0},{1,1,0,0},{0,0,0,0},{0,0,0,0}},
        {{1,1,0,0},{1,1,0,0},{0,0,0,0},{0,0,0,0}},
        {{1,1,0,0},{1,1,0,0},{0,0,0,0},{0,0,0,0}},
        {{1,1,0,0},{1,1,0,0},{0,0,0,0},{0,0,0,0}},
    },
    //TShape
    {
        {{0,1,0,0},{1,1,1,0},{0,0,0,0},{0,0,0,0}},
        {{0,1,0,0},{0,1,1,0},{0,1,0,0},{0,0,0,0}},
        {{0,0,0,0},{1,1,1,0},{0,1,0,0},{0,0,0,0}},
        {{0,1,0,0},{1,1,0,0},{0,1,0,0},{0,0,0,0}},
    },
    //LShape
    {
        {{1,1,0,0},{0,1,0,0},{0,1,0,0},{0,0,0,0}},
        {{0,0,1,0},{1,1,1,0},{0,0,0,0},{0,0,0,0}},
        {{1,0,0,0},{1,0,0,0},{1,1,0,0},{0,0,0,0}},
        {{1,1,1,0},{1,0,0,0},{0,0,0,0},{0,0,0,0}},
    },
    //JShape
    {
        {{0,1,0,0},{0,1,0,0},{1,1,0,0},{0,0,0,0}},
        {{0,0,0,0},{1,0,0,0},{1,1,1,0},{0,0,0,0}},
        {{1,1,0,0},{1,0,0,0},{1,0,0,0},{0,0,0,0}},
        {{1,1,1,0},{0,0,1,0},{0,0,0,0},{0,0,0,0}},
    },
    //SShape
    {
        {{1,0,0,0},{1,1,0,0},{0,1,0,0},{0,0,0,0}},
        {{0,1,1,0},{1,1,0,0},{0,0,0,0},{0,0,0,0}},
        {{1,0,0,0},{1,1,0,0},{0,1,0,0},{0,0,0,0}},
        {{0,1,1,0},{1,1,0,0},{0,0,0,0},{0,0,0,0}},
    },
    //ZShape
    {
        {{0,1,0,0},{1,1,0,0},{1,0,0,0},{0,0,0,0}},
        {{1,1,0,0},{0,1,1,0},{0,0,0,0},{0,0,0,0}},
        {{0,1,0,0},{1,1,0,0},{1,0,0,0},{0,0,0,0}},
        {{1,1,0,0},{0,1,1,0},{0,0,0,0},{0,0,0,0}},
    }
};

/**
 * @brief TetrixPiece::setShape
 * @param tetrixShape
 * 设置形状，默认为第一个 UP
 */
void TetrixPiece::setShape(TetrixShape tetrixShape,TetrixDirection tetrixDirection){

    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            coords[i][j] = coordsTable[tetrixShape][tetrixDirection][i][j];
        }
    }

    pieceShape = tetrixShape;
    pieceDirection = tetrixDirection;

}

/**
 * @brief TetrixPiece::setRandomShape
 * 随机选择一个形状 和一个方向
 */
void TetrixPiece::setRandomShape(){
    setShape(TetrixShape( qrand() % 7 + 1),TetrixDirection(qrand() % 4));
}

/**
 * @brief TetrixPiece::rotateLeft
 * 逆时针旋转
 */
TetrixPiece TetrixPiece::rotateLeft() const{
    TetrixPiece result;
    result.pieceShape = pieceShape;
    result.pieceDirection = TetrixDirection(pieceDirection - 1);
    if(result.pieceDirection < 0){
        result.pieceDirection = LEFT;
    }

    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            result.coords[i][j] = coordsTable[pieceShape][(int)result.pieceDirection][i][j];
        }
    }
    return result;
}

/**
 * @brief TetrixPiece::rotateRight
 * 顺时针旋转
 */
TetrixPiece TetrixPiece::rotateRight() const{
    TetrixPiece result;
    result.pieceShape = pieceShape;
    result.pieceDirection = TetrixDirection(pieceDirection + 1);
    if(result.pieceDirection > 3){
        result.pieceDirection = UP;
    }

    for(int i = 0; i < 4; i++){
        for(int j = 0; j < 4; j++){
            result.coords[i][j] = coordsTable[pieceShape][result.pieceDirection][i][j];
        }
    }
    return result;
}
