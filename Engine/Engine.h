#pragma once
#include <string>
#include <vector>
#include "Player.h"
struct Move {
    int start;
    int end;
    int moveWeight;
    std::vector <Move*> nextMoves;
    Move(int start, int end, int moveWeight) : start(start), end(end), moveWeight(moveWeight) {}
};
class engine
{
private:
    int squareWeights[8][8] = {
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0},
        {0,0,5,5,5,5,0,0},
        {0,3,5,10,10,5,3,0},
        {0,3,5,10,10,5,3,0},
        {0,0,5,5,5,5,0,0},
        {0,0,0,0,0,0,0,0},
        {0,0,0,0,0,0,0,0}
    };
    int offsets[8] = { - 9, 9, -7, 7, -8, 8, -1, 1};
    int knightOffsets[8] = { -17, 17 ,-15, 15, -10, 10, -6 ,6 };
    int pawnWhiteOffsets[4] = { -16, -8, -7, -9 };
    int pawnBlackOffsets[4] = { 16, 8, 7, 9 };
    std::string board;
    std::vector <Move*> moveList;
public:
    int movesGenerated;
    engine() {
        movesGenerated = 0;
    }
    bool onEdge(int pos);
    //Handling move generation
    void generateAllMoves(std::string& in, Player player, int depth);
    void generateAllMovesAux(std::string& in, Player player, int depth, int currentDepth, std::vector <Move*>& moves);
    void getMovePair(std::string& in, Player player, std::vector <Move*>& moves);
    void generateMoves(std::string &in, Player player, std::vector <Move*>& moves);
    //Handling move generation per individual piece
    void generateBishopMoves(std::string &in, int pos, Player , std::vector <Move*>& moves);
    void generateRookMoves(std::string &in, int pos, Player player, std::vector <Move*>& moves);
    void generateKnightMoves(std::string &in, int pos, Player player, std::vector <Move*>& moves);
    void generateKingMoves(std::string& in, int pos, Player player, std::vector <Move*>& moves);
    void generatePawnMoves(std::string &in,int pos, Player player, std::vector <Move*>& moves);
    //auxilary function that adds move to list
    void makeMove(std::string &in, int pos, int newPos, std::vector <Move*> &moves);
    //return functions
    void printMoves();
    Move* bestMove();
};