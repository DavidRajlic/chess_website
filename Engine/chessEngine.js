const { debug } = require("console");
const chessMainCPP = require("./build/release/chessMain");

const boardState = ["0000r000",
                    "0000P000",
                    "00000000",
                    "000000b0",
                    "q0000P00",
                    "q000K000",
                    "q0000000",
                    "000000bR"]


boardS = boardState.join("");

function getMove(player, depth, board){
    arg = player + depth + board;
    toReturn = chessMainCPP(arg);
    toReturn = toReturn.slice(0, -1)
    return toReturn;
}

console.log("NodeJS: "+ getMove("0", "1", boardS));