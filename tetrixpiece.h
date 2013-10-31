#ifndef TETRIXPIECE_H
#define TETRIXPIECE_H

//改形状的顺序与coordsTable所对应的形状一致
enum TetrixShape {NOShape,IShape,OShape,TShape,LShape,JShape,SShape,ZShape};
//朝向 coordsTable 从上之下的朝向均为顺时针
enum TetrixDirection {Up,Rigth,Down,Let};

class TetrixPiece
{
public:
    //初始化
    TetrixPiece(){setShape(NOShape);}
    //设置Shape
    void setShape(TetrixShape tetirxShape);
    void setRandomShape();

private:
    TetrixPiece pieceShape;
    TetrixDirection peieceDirection;
};

#endif // TETRIXPIECE_H
