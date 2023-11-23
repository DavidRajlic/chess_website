#include <node_api.h>
#include <node.h>
#include <string>
#include <iostream>	
#include "chessBoard.cpp"

void bufferToString(char buffer[64], size_t size, std::string& position){
	position = "";
	for(int i = 0; i < size; i++){
		position += buffer[i];	
	}
}

napi_value Find(napi_env env, napi_callback_info info){
	size_t argc = 1;
	napi_value args[1];
	napi_value output;
	napi_get_cb_info(env, info, &argc, args, NULL, NULL); //Retrieves arguments about the function call from node application
	
	if(argc > 1){ //Checks argument count and throws error if incorrect
		napi_value err_info;
		char* err_txt = "To many arguments";
		napi_create_string_utf8(env, err_txt, sizeof(err_txt), &err_info);
		napi_throw(env, err_info);
	}

	char buffer[65];	//obtains information about passed parameters
	size_t copiedSize;
	napi_get_value_string_utf8(env, args[0], buffer, sizeof(buffer), &copiedSize); 

	std::string position;
	bufferToString(buffer, copiedSize, position);

	chessBoard chessBoard(position);
	chessBoard.printBoard();
	std::cout << chessBoard.findPiece('K') << std::endl;
	std::cout << chessBoard.checkCheck(chessBoard.findPiece('K')) << std::endl;
	std::cout << chessBoard.checkCheckmate(chessBoard.findPiece('K')) << std::endl;
	std::cout << "Native: ";	//Troubleshooting code
	std::cout << position << std::endl; //Troubleshooting code
	
	napi_create_string_utf8(env, buffer, copiedSize, &output); //building the string to return
	return output;
}

napi_value init(napi_env env, napi_value exports){

	napi_value foundMoves;
	
	napi_create_function(env, nullptr, 0, Find, nullptr, &foundMoves);

	return foundMoves;

}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);
