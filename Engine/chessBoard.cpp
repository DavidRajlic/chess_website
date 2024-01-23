#include <iostream>
#include <string>
#include "chessBoard.h"
#include "engine.h"
chessBoard::chessBoard(/* args */)
{
}

chessBoard::~chessBoard()
{
}

// Za potrebe pogona so velike črke bele figure, male pa črne

void chessBoard::printBoard() {
	for (int i = 0; i < 64; i += 8) {
		std::cout << 8 - (i / 8) << " ";
		for (int j = 0; j < 8; j++)
			std::cout << board[i + j] << " ";
		std::cout << std::endl;
	}
	std::cout << "  ";
	for (char c = 'A'; c < 'I'; c++)
		std::cout << c << " ";
	std::cout << std::endl;
}

void chessBoard::printBoard(int i)
{
	std::string prefix = "";
	for (int j = 0; j < i; j++)
		prefix += "	";
	for (int i = 0; i < 64; i += 8) {
		std::cout << prefix << 8 - (i / 8) << " ";
		for (int j = 0; j < 8; j++)
			std::cout  << board[i + j] << " ";
		std::cout << std::endl;
	}
	std::cout << prefix << "  ";
	for (char c = 'A'; c < 'I'; c++)
		std::cout << c << " ";
	std::cout << std::endl;
}

int chessBoard::findPiece(char piece) { //will be used mainly for locating kings
	for (int i = 0; i < board.length(); i++) { //iterate over all pieces
		if (board[i] == piece)
			return i;	//return index
	}
	return -1; //return -1 if piece doesnt exist
}

bool chessBoard::checkCheck(int pos) { //Function to check if king is under check
	char pawn;
	char knight;
	char rook;
	char bishop;
	char queen;
	char king;
	if (board[pos] == 'K') {
		pawn = 'p';
		knight = 'n';
		rook = 'r';
		bishop = 'b';
		queen = 'q';
		king = 'k';
	}
	if (board[pos] == 'k') {
		pawn = 'P';
		knight = 'N';
		rook = 'R';
		bishop = 'B';
		queen = 'Q';
		king = 'K';
	}

	bool leftRow = false;
	bool diagonalFallingBlocked = false;
	bool diagonalRisingBlocked = false;
	bool horizontalBlocked = false;
	bool verticalBlocked = false;

	for (int i = pos + 1; i < board.length(); i++) { //checks in positive direction
		int offset = i - pos;
		//checks for knights
		if ((offset == 6 || offset == 10 || offset == 15 || offset == 17) && board[i] == knight) {
			return true;
		}
		if (diagonalFallingBlocked == false && offset % 7 == 0 && board[i] != '0') {
			if (board[i] == bishop || board[i] == queen)
				return true;
			else
				diagonalFallingBlocked = true;
		}
		if (diagonalRisingBlocked == false && offset % 9 == 0 && board[i] != '0') {
			if (board[i] == bishop || board[i] == queen)
				return true;
			else
				diagonalRisingBlocked = true;
		}
		if (verticalBlocked == false && offset % 8 == 0 && board[i] != '0') {
			if (board[i] == rook || board[i] == queen)
				return true;
			else
				verticalBlocked = true;
		}
		if (horizontalBlocked == false && leftRow == false && board[i] != '0') {
			if (board[i] == rook || board[i] == queen)
				return true;
			else
				horizontalBlocked = true;
		}
		if ((offset == 7 || offset == 9) && board[i] == 'P' && board[pos] == 'k')
			return true;
		if ((offset == 1 || offset == 7 || offset == 8 || offset == 9) && board[i] == king)
			return true;
		if (i + 1 % 8 == 0)
			leftRow = true;
		if (diagonalFallingBlocked && diagonalRisingBlocked && verticalBlocked && horizontalBlocked)
			break;
	}

	diagonalFallingBlocked = false;
	diagonalRisingBlocked = false;
	horizontalBlocked = false;
	verticalBlocked = false;
	for (int i = pos - 1; i >= 0; i--) { //checks in positive direction
		int offset = pos - i;
		//checks for knights
		if ((offset == 6 || offset == 10 || offset == 15 || offset == 17) && board[i] == knight) {
			return true;
		}
		if (diagonalFallingBlocked == false && offset % 7 == 0 && board[i] != '0') {
			if (board[i] == bishop || board[i] == queen)
				return true;
			else
				diagonalFallingBlocked = true;
		}
		if (diagonalRisingBlocked == false && offset % 9 == 0 && board[i] != '0') {
			if (board[i] == bishop || board[i] == queen)
				return true;
			else
				diagonalRisingBlocked = true;
		}
		if (verticalBlocked == false && offset % 8 == 0 && board[i] != '0') {
			if (board[i] == rook || board[i] == queen)
				return true;
			else
				verticalBlocked = true;
		}
		if (horizontalBlocked == false && leftRow == false && board[i] != '0') {
			if (board[i] == rook || board[i] == queen)
				return true;
			else
				horizontalBlocked = true;
		}
		if ((offset == 7 || offset == 9) && board[i] == 'p' && board[pos] == 'K')
			return true;
		if ((offset == 1 || offset == 7 || offset == 8 || offset == 9) && board[i] == king)
			return true;
		if (i % 8 == 0)
			leftRow = true;
		if (diagonalFallingBlocked && diagonalRisingBlocked && verticalBlocked && horizontalBlocked)
			break;
	}
	return false;
}

bool chessBoard::checkCheckmate(int pos) {
	bool foundSafe = false;
	int kingMoves[9] = { 0, -9, -8, -7, -1, 1, 7, 8, 9 };
	for (int i : kingMoves) {
		int nextpos = pos + i;
		if (!checkCheck(nextpos))
			foundSafe = true;
	}
	return !foundSafe;
}