#include <node_api.h>
#include <node.h>
#include <string>
#include <iostream>	
#include "chessBoard.h"
#include "engine.h"

void bufferToString(char buffer[64], size_t size, std::string& position){
	position = "";
	for(int i = 0; i < size; i++){
		position += buffer[i];	
	}
}

void stringToCharArray(const std::string& str, char* charArray) {
    strcpy(charArray, str.c_str());
}

napi_value Find(napi_env env, napi_callback_info info){
	size_t argc = 1;
	napi_value args[1];
	napi_value output;
	napi_get_cb_info(env, info, &argc, args, NULL, NULL); //Retrieves arguments about the function call from node application
	
	if(argc != 1){ //Checks argument count and throws error if incorrect
		napi_value err_info;
		char* err_txt = "Err: argc";
		napi_create_string_utf8(env, err_txt, sizeof(err_txt), &err_info);
		napi_throw(env, err_info);
	}

	char buffer[67];	//obtains information about passed parameters
	size_t copiedSize;
	napi_get_value_string_utf8(env, args[0], buffer, sizeof(buffer), &copiedSize); 

	std::string position;
	bufferToString(buffer, copiedSize, position);

	
	int player = std::stoi(position.substr(0,1));
	int depth = std::stoi(position.substr(1, 1));
	position = position.substr(2);
	chessBoard chessBoard(position);
	chessBoard.printBoard();
	std::cout << chessBoard.findPiece('K') << std::endl;
	std::cout << chessBoard.checkCheck(chessBoard.findPiece('K')) << std::endl;
	std::cout << chessBoard.checkCheckmate(chessBoard.findPiece('K')) << std::endl;
	std::cout << "Native: ";	//Troubleshooting code
	std::cout << position << std::endl; //Troubleshooting code
	std::cout << "Generating for player: " << (player == 0 ? "White" : "Black") << " on depth: " << depth << std::endl;

	engine eng;
	eng.generateAllMoves(position, (0 ? Player::white : Player::black), depth);
	Move* best = eng.bestMove();
	eng.cleanUp();

	position[best->end] = position[best->start];
	position[best->start] = '0';

	char bufferOut[64];
	stringToCharArray(position, bufferOut);

	napi_create_string_utf8(env, bufferOut, copiedSize, &output); //building the string to return
	return output;
}

napi_value init(napi_env env, napi_value exports){

	napi_value foundMoves;
	
	napi_create_function(env, nullptr, 0, Find, nullptr, &foundMoves);

	return foundMoves;

}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);
