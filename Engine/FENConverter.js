function fenTo64Chars(fen) {
 
    const [board, turn, castling, enPassant, halfmove, fullmove] = fen.split(' ');

    const expandedBoard = board.replace(/\d/g, (match) => '0'.repeat(Number(match)));

    const flattenedBoard = expandedBoard.replace(/\//g, '');

    if (flattenedBoard.length !== 64) {
        throw new Error("Invalid FEN: Board does not have 64 squares.");
    }

    return flattenedBoard;
}

function chars64ToFen(chars64) {

    if (chars64.length !== 64) {
        throw new Error("Invalid input: Board must have exactly 64 characters.");
    }

    const fenBoard = chars64.match(/.{1,8}/g).join('/');

    const zeroReplaced = fenBoard.replace(/0+/g, (match) => match.length.toString());

    const fenNotation = `${zeroReplaced} w - - 0 1`;

    return fenNotation;
}

function chars64ToChessboard(chars64) {
    if (chars64.length !== 64) {
        throw new Error("Invalid input: Board must have exactly 64 characters.");
    }

    const chessboard = Array.from({ length: 8 }, () => Array(8).fill(0));

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const index = rank * 8 + file;
            const piece = chars64.charAt(index);
            chessboard[rank][file] = piece === '0' ? 0 : piece;
        }
    }

    return chessboard;
}

function printBoard(chessboard) {
    for (let rank = 0; rank < 8; rank++) {
        console.log(chessboard[rank].join(' '));
    }
}

function chessboardToChars64(chessboard) {

    if (!Array.isArray(chessboard) || chessboard.length !== 8 || !chessboard.every(row => Array.isArray(row) && row.length === 8)) {
        throw new Error("Invalid input: Must be an 8x8 array.");
    }

    const flattenedBoard = chessboard.flat().join('');

    return flattenedBoard;
}

const fenNotation = "8/8/8/4p1K1/2k1P3/8/8/8 w KQkq - 0 1";
const result = fenTo64Chars(fenNotation);
console.log(result);
const chars64Board = "rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR";
const resultFen = chars64ToFen(chars64Board);
console.log(resultFen);
const chessboardArray = chars64ToChessboard(chars64Board);
printBoard(chessboardArray)
const resultChars64 = chessboardToChars64(chessboardArray);
console.log(resultChars64);