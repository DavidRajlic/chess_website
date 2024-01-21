const chessMainCPP = require("./build/release/chessMain");

const boardState = ["00B0r000",
                    "0000P000",
                    "00000000",
                    "000000b0",
                    "q0000P00",
                    "q000K000",
                    "q0000000",
                    "000000bR"]
console.log("NodeJS: "+chessMainCPP(boardState.join(""), 1));
