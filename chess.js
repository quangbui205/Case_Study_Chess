const BLACK =1;

const EMPTY = -1;
const PAWN = 0;
const KNIGHT = 1;
const BISHOP = 2;
const ROOK = 3;
const QUEEN = 4;
const KING = 5;

const INVALID =0;
const VALID =1;
const VALID_CAPTUE =2;

const piecesCharatees ={
    0:'p',
    1:'k',
    2:'b',
    3:'r',
    4:'q',
    5:'k',
};

let chessCanvas;
let chessCtx;
let currentTeamText;
let whiteCasualitiesText;
let blackCasualitiesText;
let totalVictoriesText;


