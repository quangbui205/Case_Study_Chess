const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

const TILE_SIZE = 50;
const WHITE_TILE_COLOR = "white";
const BLACK_TILE_COLOR = "black";
const HIGHLIGHT_COLOR = "red";
const WHITE = 0;
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

const piecesCharacters ={
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

let board;
let currentTeam;

let curX;
let curY;

let whiteCasualities;
let blackCasualities;

let whiteVictories;
let blackVictories;

document.addEventListener("DOMContentLoaded",onload);
function onload()
{
    chessCanvas = document.getElementById('chessCanvas');
    chessCtx = chessCanvas.getContext("2d");
    chessCanvas.addEventListener("click",onclick);
    currentTeamText = document.getElementById("currentTeamText");

    whiteCasualitiesText = document.getElementById('whiteCasualities');
    blackCasualitiesText = document.getElementById("blackCasualities");

    totalVictoriesText =document.getElementById("totalVitories");
    whiteVictories = 0;
    blackVictories = 0;

    startGame();
}
 function startGame()
 {
     board = new Board();
     curX =-1;
     curY =-1;

     currentTeam = WHITE;
     currentTeamText= "White's turn";

     whiteCasualities =[0,0,0,0];
     blackCasualities =[0,0,0,0];

     repaintBoard();
     updateWhiteCasualities();
     updateBlackCasualities();
     updateTotalVictories();
 }
 function onClick(event)
 {
     let chessCanvasX = chessCanvas.getBoundingClientRect().left;
     let chessCanvasY = chessCanvas.getBoundingClientRect().top;

     let x = Math.floor((event.clientX - chessCanvasX)/TILE_SIZE);
     let y = Math.floor((event.clientY - chessCanvasY)/TILE_SIZE);

     if (checkValidMovement(x,y)=== true)
     {
         if (checkValidCapture(x,y) === true)
         {
             if(board.tiles[y][x].pieceType === KING)
             {
                 if (currentTeam === WHITE) whiteVictories++;
                 else blackVictories++;

                 startGame();
             }
             if (currentTeam === WHITE)
             {
                 blackCasualities[board.tiles[y][x].pieceType]++;
                 updateBlackCasualities();
             }
             else
             {
                 whiteCasualities[board.tiles[y][x].pieceType]++;
                 updateWHiteCasualities();
             }
         }
         moveSelectPiece(x,y);
         changeCurrentTeam();
     }
     else
     {
         curX=x;
         curY=y;
     }
     repaintBoard();
 }
 function checkPossiblePlays()
 {
     if (curX<0 || curY<0) return;

     let tule = borad.tile[curX][curY];
     if (tile.team === Empty || tile.team!==currentTeam) return;

     drawTile(curX,curY, HIGHLIGHT_COLOR);
     board.resetValidMoves();
     if(tile.pieceType === PAWN) checkPossiblePlaysPawn(curX, curY);
     else if(tile.pieceType === KNIGHT) checkPossiblePlaysKnight(curX, curY);
     else if(tile.pieceType === BISHOP) checkPossiblePlaysBishop(curX, curY);
     else if(tile.pieceType === ROOK) checkPossiblePlaysRook(curX, curY);
     else if(tile.pieceType === QUEEN) checkPossiblePlaysQueen(curX, curY);
     else if(tile.pieceType === KING) checkPossiblePlaysKing(curX, curY);

 }
 function checkPossiblePlaysPawn(curX, curY)
 {
     let direction;

     if(currentTeam === WHITE) direction =-1;
     else direction =0;

     if (curY + direction<0||curY+direction > BOARD_HEIGHT-1) return;
     checkPossibleMove(curX,curY+2*direction);

     if(curY ===1||curY===6)
     {
         checkPossibleMove(curX,curY+2*direction);
     }
     if(curX-1>=0)checkPossibleMove(curX-1,curY+direction);
     if(curX+1 == BOARD_WIDTH-1) checkPossibleMove(curX+1,curY+direction); //chus y

 }
function checkPossiblePlaysKnight(curX, curY)
{
    if (curX -2 >=0)
    {
        if (curY-1>=0) checkPossiblePlay(curX-2,curY-1);
        if(curY <=BOARD_HEIGHT-1) checkPossiblePlay(curX-2,curY+1);
    }
    if (curX-1>0)
    {
        if(curY-2>=0)checkPossiblePlay(curX-1,curY-2);
        if(curY+2<=BOARD_HEIGHT-1) checkPossiblePlay(curX+1,curY+2);
    }
    if (curX+2<=BOARD_WIDTH-1)
    {
        if (curY-1>=0)checkPossiblePlay(curX+2,curY-1)
        if(curY+1<=BOARD_HEIGHT-1) checkPossiblePlay(curX+2,curY+1);
    }

}
function checkPossiblePlaysRook(curX, curY)
{
    for(i=1;curY-i>=0;i++)
    {
        if(checkPossiblePlay(curX,curY-i))break;
    }
    for(i=1;curX-i>=0;i++)
    {
        if(checkPossiblePlay(curX-i,curY))break;
    }
}
function checkPossiblePlaysBishop(curX, curY)
{
    for (i=1;curX+1<BOARD_WIDTH-1 && curY-1 >=0; i++)
    {
        if(checkPossiblePlay(curX+1,curY-1))break;
    }
    for(i=1;curX-i>=0 && curY+i <=BOARD_HEIGHT-1;i++)
    {
        if(checkPossiblePlay(curX-i,curY+i))break;
    }
    for(i=1;curX-i>=0 && curY-i >=0;i++)
    {
        if(checkPossiblePlay(curX-i),curY-i) break;
    }
}
function checkPossiblePlaysQueen(curX, curY)
{
      checkPossiblePlaysRook(curX,curY);
      checkPossiblePlaysBishop(curX,curY);
}
function checkPossiblePlaysKing(curX, curY)
{
    for(i=-1;i<=1;i++)
    {
        if(curY+1<0||curY+1>BOARD_HEIGHT-1)continue;
        for(j=-1;j<=1;j++)
        {
            if(curX+j<0 ||curX+j>BOARD_WIDTH-1)continue; //luu y
            if(i==0 &&j==0)continue;
            checkPossiblePlay(curX+j, curY+i);
        }
    }
}
function checkPossiblePlay(x,y)
{
    if(checkPossibleCapture(x,y)) return true;
    return !checkPossibleMove(x,y);
}
function checkPossibleMove(x,y)
{
    if (board.tile[y][x].team !== EMPTY) return false;

    board.validMoves[y][x] = VALID;
    drawCircle(x,y,HIGHLIGHT_COLOR);
    return true;
}
function checkPossibleCapture(x,y)
{
    if(board.tiles[y][x].team !==getOppositeTeam(currentTeam))return false;

    board.validMoves[y][x] =VALID_CAPTUE;
    drawCorrners(x,y,HIGHLIGHT_COLOR);
    return true;
}
function checkValidMovement(x,y)
{
    if(board.ValidMoves[y][x] === VALID||board.validMoves[y][x] === VALID_CAPTUE) return true;
    else return false;
}
function checkValidCapture(x,y)
{
    if(board.validMoves[y][x] === VALID_CAPTUE)return true;
    else return false;
}
function moveSelectedPiece(x,y)
{
    board.tiles[y][x].pieceType = board.tiles[curY][CurX].pieceType;
    board.tiles[y][x].team = board.tiles[curY][CurX].team;

    board.tiles[y][x].pieceType = EMPTY;
    board.tiles[y][x].team = EMPTY;

    curX = -1;
    curY =-1;
    board.resetValidMoves();
}
function changeCurrentTeam()
{
    if(currentTeam === WHITE)
    {
        currentTeamText.textContent = "Black's turn";
        currentTeam = BLACK;
    }
    else
    {
        currentTeamText.textContent = "White's turn";
        currentTeam = WHITE;
    }
}
function repaintBoard()
{
    drawBoard();
    checkPossiblePlays();
    drawPieces();
}
function drawBoard()
{
    chessCtx.fillStyle = WHITE_TILE_COLOR;
    chessCtx.fillRect(0,0,BOARD_WIDTH*TILE_SIZE, BOARD_HEIGHT*TILE_SIZE);

    for(i =0;i<BOARD_HEIGHT;i++)
    {
        for(j=0;j<BOARD_WIDTH;j++)
        {
            if((i+j)%2 ===1) drawTile(j,i,BLACK_TILE_COLOR);
        }
    }
}
function drawTile(x,y,fillStyle)
{
    chessCtx.fillStyle = fillStyle;
    chessCtx.fillRect(TILE_SIZE*x, TILE_SIZE*y,TILE_SIZE,TILE_SIZE);
}
function drawCircle(x,y,fillStyle)
{
    chessCtx.fillStyle = fillStyle
    chessCtx.beginPath();
    chessCtx.arc(TILE_SIZE*(x+0.5),TILE_SIZE/5,0,2*Math.PI);
    chessCtx.fill();
}
function drawCorners(x,y,fillStyle)
{
    chessCtx.fillStyle = fillStyle;

    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE*x,TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*x+15, TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*x,TILE_SIZE*y+15);
    chessCtx.fill();

    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE*(x+1),TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*(x+1)-15,TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*x,TILE_SIZE*(y+1)-15);
    chessCtx.fill();

    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE*(x+1),TILE_SIZE*(y+1));
    chessCtx.lineTo(TILE_SIZE(x+1)-15,TILE_SIZE*(y+1));
    chessCtx.lineTo(TILE_SIZE*(x+1),TILE_SIZE*(y+1)-15);
    chessCtx.fill();
}
function drawPieces()
{
    for(i=0;i<BOARD_HEIGHT;i++)
    {
        for(j=0;j<BOARD_HEIGHT;j++)
        {
            if(board.tiles[i][j].team === EMPTY) continue;

            if(board.tiles[i][j].team === WHITE)
            {
                chessCtx.fillStyle = "#ff0000";
            }
            else
            {
                chessCtx.fillStyle = "#0000ff"
            }
            chessCtx.font = "50 Arial";
            let pieceType = board.tiles[i][j].pieceType;
            chessCtx.fillText(piecesCharacters[pieceType],TILE_SIZE*(j+1/8),TILE_SIZE*(i+4/5));
        }
    }
}
function updateWhiteCasualities()
{
    updateCasualities(whiteCasualities,whiteCasualitiesText);
}
function updateBlackCasualities()
{
    updateCasualities(blackCasualities,blackCasualitiesText);
}
function updateCasualities(casualities, text)
{
    let none = true;
    for(i= QUEEN;i >=PAWN;i--)
    {
        if(casualities[i]===0)continue;
        if(none)
        {
            text = casualities[i]+ " " + piecesCharacters[i];
        }
    }
    if(none) text.textContent = "None";
}
function updateTotalVictories()
{
    totalVictoriesText = "Game won: White" + whiteVictories + "-black" + blackVictories;
}
function getOppositeTeam(team)
{
    if(team === WHITE) return BLACK;
    else if(team === BLACK) return WHITE;
    else return EMPTY;
}
class Board
{
    constructor()
    {
        this.tiles = [];

        this.tiles.push([
            new Tile(ROOK,BLACK),
            new Tile(KNIGHT,BLACK),
            new Tile(BISHOP,BLACK),
            new Tile(QUEEN,BLACK),
            new Tile(KING,BLACK),
            new Tile(BISHOP,BLACK),
            new Tile(KNIGHT,BLACK),
            new Tile(ROOK,BLACK),
        ]);
        this.tiles.push([
            new Tile(PAWN,BLACK),
            new Tile(PAWN,BLACK),
            new Tile(PAWN,BLACK),
            new Tile(PAWN,BLACK),
            new Tile(PAWN,BLACK),
            new Tile(PAWN,BLACK),
            new Tile(PAWN,BLACK),
            new Tile(PAWN,BLACK),
        ]);
        for (let i=0;i<4;i++)
        {
            this.tiles.push([
                new Tile(EMPTY,EMPTY),
                new Tile(EMPTY,EMPTY),
                new Tile(EMPTY,EMPTY),
                new Tile(EMPTY,EMPTY),
                new Tile(EMPTY,EMPTY),
                new Tile(EMPTY,EMPTY),
                new Tile(EMPTY,EMPTY),
                new Tile(EMPTY,EMPTY),
            ]);
        }
        this.tiles.push([
            new Tile(PAWN,WHITE),
            new Tile(PAWN,WHITE),
            new Tile(PAWN,WHITE),
            new Tile(PAWN,WHITE),
            new Tile(PAWN,WHITE),
            new Tile(PAWN,WHITE),
            new Tile(PAWN,WHITE),
            new Tile(PAWN,WHITE),
        ]);
        this.tiles.push([
            new Tile(ROOK,WHITE),
            new Tile(KNIGHT,WHITE),
            new Tile(BISHOP,WHITE),
            new Tile(QUEEN,WHITE),
            new Tile(KING,WHITE),
            new Tile(BISHOP,WHITE),
            new Tile(KNIGHT,WHITE),
            new Tile(ROOK,WHITE),
        ]);
        this.validMoves =[];
        for(let i=0;i<BOARD_HEIGHT;i++)
        {
            this.validMoves.push([
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
            ]);
        }
    }
    resetValidMoves()
    {
        for (let i=0;i<BOARD_HEIGHT;i++)
        {
            for(let j=0;j<BOARD_WIDTH;j++)
            {
                this.validMoves[i][j]=INVALID;
            }
        }
    }
}
class Tile
{
    constructor(pieceType,team)
    {
        this.pieceType =pieceType;
        this.team = team;
    }
}


