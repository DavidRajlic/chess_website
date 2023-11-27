#pragma once
#include <string>
#include <vector>
#include "Player.h"
struct Move {
    int start;
    int end;
    char takes;
    Move(int start, int end, char takes) : start(start), end(end), takes(takes) {}
};
class engine
{
private:
    int offsets[8] = { - 9, 9, -7, 7, -8, 8, -1, 1};
    int knightOffsets[8] = { -17, 17 ,-15, 15, -10, 10, -6 ,6 };
    int pawnWhiteOffsets[4] = { -16, -8, -7, -9 };
    int pawnBlackOffsets[4] = { 16, 8, 7, 9 };
    std::string board;
    std::vector <Move> moves;
public:
    bool onEdge(int pos);
    void generateMoves(std::string &in, Player player);
    void generateBishopMoves(std::string &in, int pos, Player player);
    void generateRookMoves(std::string &in, int pos, Player player);
    void generateKnightMoves(std::string &in, int pos, Player player);
    void generateKingMoves(std::string& in, int pos, Player player);
    void generatePawnMoves(std::string &in,int pos, Player player);
    void printMoves();
    Move bestMove();
};