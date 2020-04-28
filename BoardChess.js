function cell_Board_Chess(name,isOccupied,cellValue)
{
    this.name = name;
    this.isOccupied = isOccupied;
    this.cellValue = cellValue;
    this.getName =function ()
    {
        return this.name;
    }
    this.getIsOccupied = function()
    {
        return this.isOccupied;
    }
    this.getCellValue = function()
    {
        return this.cellValue;
    }
    this.getCell()
    {
        console.log(this.name);
    }
    this.setName =function()
    {
        this.name = name;
    }
    this.setIsOccupied = function()
    {
        this.isOccupied = isOccupied;
    }
    this.setCellValue = function()
    {
        this.cellValue= cellValue;
    }
}
function boardChess()
{
    let board = [];
    let rowNum = "A";
    let occupy = false;
    let cellvalue = null;
    for(i=0;i<8;i++)
    {
        let row = new Array();
        board[i]= row;
        let colNum = 1;
        for(j=0;j<8;j++)
        {
            let namecell = colNum + rowNum.toString();
            let cell = new cell_Board_Chess(namecell,occupy,cellvalue);
            board[i][j] = cell;
            colNum ++;
        }
        String.fromCharCode(rowNum.charCodeAt() + 1);
    }
    board[4][4].getCell();
    board[5][5].getCell();
}