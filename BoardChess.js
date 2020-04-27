function draw_Broad(array)
{
    array = array + "<table border='1px'>";
    for(i=0;i<8;i++)
    {
        array = new Array();
        array[i][0] = array[i][0] + "<tr>";
        for(j=0;j<8;j++)
        {
            array[i][j] = array[i][j] + "<td style='border: 1px solid black'>" + "adasdasd" + "</td>";
        }
        array[i][7]= array[i][7] + "</tr>" + "<br>";
    }
    array = array + "</table>";
    out_board(array);
}
function out_board(array)
{
    for(i=0;i<8;i++)
    {
        for(j=0;j<8;j++)
        {
            document.write(array[i][j]);
        }
    }

}