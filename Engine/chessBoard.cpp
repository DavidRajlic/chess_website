#include <iostream>
#include <string>
class chessBoard
{
private:
    std::string board;
public:
    chessBoard();
    chessBoard(std::string board) : board(board){};
    ~chessBoard();
    void printBoard();
};

chessBoard::chessBoard(/* args */)
{
}

chessBoard::~chessBoard()
{
}

void chessBoard::printBoard() {
	for (int i = 0; i < 64; i += 8) {
		std::cout << 8 - (i / 8) << " ";
		for (int j = 0; j < 8; j++)
			std::cout << board[i+j] << " ";
		std::cout << std::endl;
	}
	std::cout << "  ";
	for (char c = 'A'; c < 'I'; c++)
		std::cout << c << " ";
    std::cout << std::endl;
}