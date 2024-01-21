#pragma once
class chessBoard
{
private:
	std::string board;
public:
	chessBoard();
	chessBoard(std::string board) : board(board) {};
	~chessBoard();
	void printBoard();
	void printBoard(int i);
	int findPiece(char piece);
	bool checkCheck(int pos);
	bool checkCheckmate(int pos);
};
