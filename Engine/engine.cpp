#include "engine.h"
#include "iostream"
#include "Player.h"
#include "Weight.h"
#include "chessBoard.h"
bool engine::onEdge(int pos)
{
	if (pos % 8 == 0 || (pos + 1) % 8 == 0) {
		return true;
	}
	return false;
}


void engine::generateAllMoves(std::string& in, Player player, int depth)
{
	std::string boardTemp;
	std::string boardTempInner;
	getMovePair(in, player, moveList);
	for (Move* m : moveList) {
		boardTemp = in;
		boardTemp[m->end] = boardTemp[m->start];
		boardTemp[m->start] = '0';
#ifdef DEBUG2
		std::cout << "Depth 1 player 1: " << m->start << " " << m->end << std::endl;
		chessBoard cb1(boardTemp);
		cb1.printBoard();
		std::cout << std::endl;
#endif // DEBUG2

		for (Move* m2 : m->nextMoves) {
			boardTempInner = boardTemp;
			boardTempInner[m2->end] = boardTempInner[m2->start];
			boardTempInner[m2->start] = '0';
#ifdef DEBUG2
			std::cout << "Depth 1 player 2: " << m2->start << " " << m2->end << std::endl;
			chessBoard cb2(boardTempInner);
			cb2.printBoard(1);
			std::cout << std::endl;
#endif //DEBUG2
			generateAllMovesAux(boardTempInner, player, depth, 1, m2->nextMoves);
		
		}
	}
}

void engine::generateAllMovesAux(std::string& in, Player player, int depth, int currentDepth, std::vector <Move*>& moves)
{

	getMovePair(in, player, moves);
	std::string boardTemp;
	std::string boardTempInner;
	for (Move* m : moves) {
		boardTemp = in;
		boardTemp[m->end] = boardTemp[m->start];
		boardTemp[m->start] = '0';
#ifdef DEBUG2
		std::cout << "Depth 2 player 1: " << m->start << " " << m->end << std::endl;
		chessBoard cb1(boardTemp);
		cb1.printBoard(2);
		std::cout << std::endl;
#endif // !DEBUG2

		for (Move* m2 : m->nextMoves) {
			boardTempInner = boardTemp;
			boardTempInner[m2->end] = boardTempInner[m2->start];
			boardTempInner[m2->start] = '0';
#ifdef DEBUG2
			std::cout << "Depth 2 player 2: " << m2->start << " " << m2->end << std::endl;
			chessBoard cb2(boardTempInner);
			cb2.printBoard(3);
			std::cout << std::endl;
#endif // DEBUG2
		}
	}
}

Player nextPlayer(Player player) {
	if (player == Player::white)
		return Player::black;
	else
		return Player::white;
}

void engine::getMovePair(std::string& in, Player player, std::vector <Move*>& moves)
{
	generateMoves(in, player, moves);
	std::string inMoved = in;
	for (Move* m : moves) {
		inMoved[m->end] = inMoved[m->start];
		inMoved[m->start] = '0';
		generateMoves(inMoved, nextPlayer(player), m->nextMoves);
		inMoved = in;
	}

}

void engine::generateMoves(std::string &in, Player player, std::vector <Move*> &moves) {
	if(player == Player::white)
		for (int i = 0; i < 64; i++) {
			if (in[i] != '0' && isupper(in[i])) {
				switch (in[i])
				{
				case 'Q':
					generateBishopMoves(in, i, player, moves);
					generateRookMoves(in, i, player, moves);
					break;
				case 'R':
					generateRookMoves(in, i, player, moves);
					break;
				case 'B':
					generateBishopMoves(in, i, player, moves);
					break;
				case 'N':
					generateKnightMoves(in, i, player, moves);
					break;
				case 'K':
					generateKingMoves(in, i, player, moves);
					break;
				case 'P':
					generatePawnMoves(in, i, player, moves);
					break;
				default:
					break;
				}
			}
		}
	if(player == Player::black)
		for (int i = 0; i < 64; i++) {
			if (in[i] != '0' && islower(in[i])) {
				switch (in[i])
				{
				case 'q':
					generateBishopMoves(in, i, player, moves);
					generateRookMoves(in, i, player, moves);
					break;
				case 'r':
					generateRookMoves(in, i, player, moves);
					break;
				case 'b':
					generateBishopMoves(in, i, player, moves);
					break;
				case 'n':
					generateKnightMoves(in, i, player, moves);
					break;
				case 'k':
					generateKingMoves(in, i, player, moves);
					break;
				case 'p':
					generatePawnMoves(in, i, player, moves);
					break;
				default:
					break;
				}
			}
		}
}

void engine::generateBishopMoves(std::string &in, int pos, Player player, std::vector <Move*> &moves)
{
	for (int i = 0; i < 4; i++) {
		for (int j = pos + offsets[i]; j > 0 && j < 64; j += offsets[i]) {
			if (onEdge(pos) && onEdge(j) && i != 4 && i != 5) {
				break;
			}
			else if (onEdge(j) && i != 4 && i != 5) {
#ifdef DEBUG
				in[j] = 'X';
#endif // DEBUG	
				makeMove(in, pos, j, moves);
				break;
			}
			else if (in[j] != '0' && isupper(in[j])) {
				if (player == Player::black) {//TODO add eating logic here
#ifdef DEBUG
						in[j] = 'X';
#endif // DEBUG	
						makeMove(in, pos, j, moves);
				}
				break;
			}
			else if (in[j] != '0' && islower(in[j])) {
				if (player == Player::white) {//TODO add eating logic here
#ifdef DEBUG
					in[j] = 'X';
#endif // DEBUG	
					makeMove(in, pos, j, moves);
				}
				break;
			}
			else if (in[j] == '0') {
#ifdef DEBUG
				in[j] = 'X';
#endif // DEBUG	
				makeMove(in, pos, j, moves);
			}
		}
	}
}

void engine::generateRookMoves(std::string &in, int pos, Player player, std::vector <Move*>& moves)
{
	for (int i = 4; i < 8; i++) {
		for (int j = pos + offsets[i]; j > 0 && j < 64; j += offsets[i]) {
			if (onEdge(pos) && onEdge(j) && i != 4 && i != 5) {
				break;
			}
			else if (onEdge(j) && i != 4 && i != 5) {
#ifdef DEBUG
				in[j] = 'X';
#endif // DEBUG	
				makeMove(in, pos, j, moves);
				break;
			}
			else if (in[j] != '0' && isupper(in[j])) {
				if (player == Player::black) {//TODO add eating logic here
#ifdef DEBUG
					in[j] = 'X';
#endif // DEBUG	
					makeMove(in, pos, j, moves);
				}
				break;
			}
			else if (in[j] != '0' && islower(in[j])) {
				if (player == Player::white) {//TODO add eating logic here
#ifdef DEBUG
					in[j] = 'X';
#endif // DEBUG	
					makeMove(in, pos, j, moves);
				}
				break;

			}
			else if (in[j] == '0') {
#ifdef DEBUG
				in[j] = 'X';
#endif // DEBUG	
				makeMove(in, pos, j, moves);
			}
		}
	}
}

void engine::generateKnightMoves(std::string &in, int pos, Player player, std::vector <Move*>& moves)
{
	for (int i = 0; i < 8; i++) {
		int newPos = pos + knightOffsets[i];
		if (newPos >= 0 && newPos < 64) {

			int knightPosX = (pos % 8) + 1;
			int knightPosY = (pos / 8) + 1;
			int knightNewPosX = (newPos % 8) + 1;
			int knightNewPosY = (newPos / 8) + 1;
			double distance = sqrt(pow(knightNewPosX - knightPosX , 2) + pow(knightNewPosY - knightPosY , 2));

			if (in[newPos] == '0' && distance < 2.5){
#ifdef DEBUG
					in[newPos] = 'X';
#endif // DEBUG
					makeMove(in, pos, newPos, moves);
			}

				
			else if ((player == Player::white ? islower(in[newPos]) : isupper(in[newPos])) && distance < 2.5) {
#ifdef DEBUG
				in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
				makeMove(in, pos, newPos, moves);
			}
		}	
	}
}

void engine::generateKingMoves(std::string& in, int pos, Player player, std::vector <Move*>& moves)
{
	for (int i = 0; i < 8; i++) {
		int newPos = pos + offsets[i];
		if (newPos >= 0 && newPos < 64) {

			int kingPosX = (pos % 8) + 1;
			int kingPosY = (pos / 8) + 1;
			int kingNewPosX = (newPos % 8) + 1;
			int kingNewPosY = (newPos / 8) + 1;
			double distance = sqrt(pow(kingNewPosX - kingPosX, 2) + pow(kingNewPosY - kingPosY, 2));

			if (in[newPos] == '0' && distance < 1.5) {
#ifdef DEBUG
				in[newPos] = 'X';
#endif // DEBUG
				makeMove(in, pos, newPos, moves);
			}
			else if ((player == Player::white ? islower(in[newPos]) : isupper(in[newPos])) && distance < 1.5) {
#ifdef DEBUG
				in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
				makeMove(in, pos, newPos, moves);
			}
		}
	}
}

void engine::generatePawnMoves(std::string &in, int pos, Player player, std::vector <Move*>& moves)
{
	int* pawnOffsets;
	if (player == Player::white)
		pawnOffsets = pawnWhiteOffsets;
	else if (player == Player::black)
		pawnOffsets = pawnBlackOffsets;
	else
		return;

	int newPos;
	

	newPos = pos + pawnOffsets[1];
	if (!onEdge(pos) && in[newPos] == '0') {
#ifdef DEBUG
		in[newPos] = 'X'; //TODO add promotion logic here
#endif // DEBUG
		makeMove(in, pos, newPos, moves);
		//CODE FOR INITIAL 2 LONG MOVE
		newPos = pos + pawnOffsets[0];
		int pawnPosY = (pos / 8) + 1;
		if (pawnPosY == 2 && player == Player::black && in[newPos] == '0') {
#ifdef DEBUG
			in[newPos] = 'X';
#endif // DEBUG
			makeMove(in, pos, newPos, moves);
		}

		if (pawnPosY == 7 && player == Player::white && in[newPos] == '0') {
#ifdef DEBUG
			in[newPos] = 'X';
#endif // DEBUG
			makeMove(in, pos, newPos, moves);
		}
	}

	newPos = pos + pawnOffsets[2];
	int pawnPosY = (pos / 8) + 1;
	int newPawnPosY = (newPos / 8) + 1;
	if (in[newPos] != 0 && pawnPosY != newPawnPosY && (player == Player::white ? islower(in[newPos]) : isupper(in[newPos]))) {
#ifdef DEBUG
		in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
		makeMove(in, pos, newPos, moves);
	}
	newPos = pos + pawnOffsets[3];
	if (in[newPos] != 0 && pawnPosY != newPawnPosY && (player == Player::white ? islower(in[newPos]) : isupper(in[newPos]))) {
#ifdef DEBUG
		in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
		makeMove(in, pos, newPos, moves);
	}
}

void engine::makeMove(std::string &in, int pos, int newPos, std::vector <Move*> &moves){
	int weight;
	if (in[newPos] == 'p' || in[newPos] == 'P')
		weight = (int)Weight::pawn;
	else if (in[newPos] == 'n' || in[newPos] == 'N')
		weight = (int)Weight::knight;
	else if (in[newPos] == 'b' || in[newPos] == 'B')
		weight = (int)Weight::bishop;
	else if (in[newPos] == 'r' || in[newPos] == 'R')
		weight = (int)Weight::rook;
	else if (in[newPos] == 'q' || in[newPos] == 'Q')
		weight = (int)Weight::queen;
	else
		weight = 0;
	moves.push_back(new Move(pos, newPos, weight));
	movesGenerated++;
}



void engine::printMoves()
{
	for (Move* m : moveList) {
		std::cout << m->start << " " << m->end << " " << (m->moveWeight != '0' ? m->moveWeight : '/') << std::endl;
		for (Move* nm : m->nextMoves) {
			std::cout << "	" << nm->start << " " << nm->end << " " << (nm->moveWeight != '0' ? nm->moveWeight : '/') << std::endl;
		}
	}
}

Move* engine::bestMove()
{
	std::cout << "Finding best move: ";
	int bestWeight = 0;
	Move* toReturn = nullptr;
	for (Move* m : moveList) {
		if (m->moveWeight + squareWeights[m->end / 8][m->end % 8] >= bestWeight)
		{
			bestWeight = m->moveWeight + squareWeights[m->end / 8][m->end % 8];
			toReturn = m;
		}
	}
	std::cout << std::endl << bestWeight << std::endl;
	return toReturn;
}
