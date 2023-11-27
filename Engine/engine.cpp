#include "engine.h"
#include "iostream"
#include "Player.h"


bool engine::onEdge(int pos)
{
	if (pos % 8 == 0 || (pos + 1) % 8 == 0) {
		return true;
	}
	return false;
}

void engine::generateMoves(std::string &in, Player player) {
	if(player == Player::white)
		for (int i = 0; i < 64; i++) {
			if (in[i] != '0' && isupper(in[i])) {
				switch (in[i])
				{
				case 'Q':
					generateBishopMoves(in, i, player);
					generateRookMoves(in, i, player);
					break;
				case 'R':
					generateRookMoves(in, i, player);
					break;
				case 'B':
					generateBishopMoves(in, i, player);
					break;
				case 'N':
					generateKnightMoves(in, i, player);
					break;
				case 'K':
					generateKingMoves(in, i, player);
					break;
				case 'P':
					generatePawnMoves(in, i, player);
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
					generateBishopMoves(in, i, player);
					generateRookMoves(in, i, player);
					break;
				case 'r':
					generateRookMoves(in, i, player);
					break;
				case 'b':
					generateBishopMoves(in, i, player);
					break;
				case 'n':
					generateKnightMoves(in, i, player);
					break;
				case 'k':
					generateKingMoves(in, i, player);
					break;
				case 'p':
					generatePawnMoves(in, i, player);
					break;
				default:
					break;
				}
			}
		}
}

void engine::generateBishopMoves(std::string &in, int pos, Player player)
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
				moves.push_back(Move(pos, j, in[j]));
				break;
			}
			else if (in[j] != '0' && isupper(in[j])) {
				if (player == Player::black) {//TODO add eating logic here
#ifdef DEBUG
						in[j] = 'X';
#endif // DEBUG	
						moves.push_back(Move(pos, j, in[j]));
				}
				break;
			}
			else if (in[j] != '0' && islower(in[j])) {
				if (player == Player::white) {//TODO add eating logic here
#ifdef DEBUG
					in[j] = 'X';
#endif // DEBUG	
					moves.push_back(Move(pos, j, in[j]));
				}
				break;
			}
			else if (in[j] == '0') {
#ifdef DEBUG
				in[j] = 'X';
#endif // DEBUG	
				moves.push_back(Move(pos, j, in[j]));
			}
		}
	}
}

void engine::generateRookMoves(std::string &in, int pos, Player player)
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
				moves.push_back(Move(pos, j, in[j]));
				break;
			}
			else if (in[j] != '0' && isupper(in[j])) {
				if (player == Player::black) {//TODO add eating logic here
#ifdef DEBUG
					in[j] = 'X';
#endif // DEBUG	
					moves.push_back(Move(pos, j, in[j]));
				}
				break;
			}
			else if (in[j] != '0' && islower(in[j])) {
				if (player == Player::white) {//TODO add eating logic here
#ifdef DEBUG
					in[j] = 'X';
#endif // DEBUG	
					moves.push_back(Move(pos, j, in[j]));
				}
				break;

			}
			else if (in[j] == '0') {
#ifdef DEBUG
				in[j] = 'X';
#endif // DEBUG	
				moves.push_back(Move(pos, j, in[j]));
			}
		}
	}
}

void engine::generateKnightMoves(std::string &in, int pos, Player player)
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
					moves.push_back(Move(pos, newPos, in[newPos]));
			}

				
			else if ((player == Player::white ? islower(in[newPos]) : isupper(in[newPos])) && distance < 2.5) {
#ifdef DEBUG
				in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
				moves.push_back(Move(pos, newPos, in[newPos]));
			}
		}	
	}
}

void engine::generateKingMoves(std::string& in, int pos, Player player)
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
				moves.push_back(Move(pos, newPos, in[newPos]));
			}
			else if ((player == Player::white ? islower(in[newPos]) : isupper(in[newPos])) && distance < 1.5) {
#ifdef DEBUG
				in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
				moves.push_back(Move(pos, newPos, in[newPos]));
			}
		}
	}
}

void engine::generatePawnMoves(std::string &in, int pos, Player player)
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
		moves.push_back(Move(pos, newPos, in[newPos]));
		//CODE FOR INITIAL 2 LONG MOVE
		newPos = pos + pawnOffsets[0];
		int pawnPosY = (pos / 8) + 1;
		if (pawnPosY == 2 && player == Player::black && in[newPos] == '0') {
#ifdef DEBUG
			in[newPos] = 'X';
#endif // DEBUG
			moves.push_back(Move(pos, newPos, in[newPos]));
		}

		if (pawnPosY == 7 && player == Player::white && in[newPos] == '0') {
#ifdef DEBUG
			in[newPos] = 'X';
#endif // DEBUG
			moves.push_back(Move(pos, newPos, in[newPos]));
		}
	}

	newPos = pos + pawnOffsets[2];
	if (in[newPos] != 0 && (player == Player::white ? islower(in[newPos]) : isupper(in[newPos]))) {
#ifdef DEBUG
		in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
		moves.push_back(Move(pos, newPos, in[newPos]));
	}
	newPos = pos + pawnOffsets[3];
	if (in[newPos] != 0 && (player == Player::white ? islower(in[newPos]) : isupper(in[newPos]))) {
#ifdef DEBUG
		in[newPos] = 'X'; //TODO add eating logic here
#endif // DEBUG
		moves.push_back(Move(pos, newPos, in[newPos]));
	}
}

void engine::printMoves()
{
	for (Move m : moves) {
		std::cout << m.start << " " << m.end << " " << (m.takes != '0' ? m.takes : '/') << std::endl;
	}
}

Move engine::bestMove()
{
	std::srand(std::time(0)); 
	int random_pos = std::rand() % moves.size();
	Move random_val = moves[random_pos];
	return random_val;
}
