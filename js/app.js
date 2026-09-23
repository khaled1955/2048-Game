import {getGrid , endGame , moveLeftAll , moveRightAll , moveUpAll , moveDownAll , getScore , getBestScore} from "./game.js";

function render(){
    let gridCells = document.querySelectorAll(".grid-cell");
    for(let i = 0 ; i < gridCells.length ; i++){
        let gridFromApp = getGrid();
        let index = 0;
        for(let row = 0 ; row < gridFromApp.length; row++){
            for(let column = 0 ; column < gridFromApp[row].length; column++){
                tileStyle(gridCells[index] , gridFromApp[row][column]);
                if(gridFromApp[row][column] === 0){
                    gridCells[index].innerText = "";
                }
                else{
                    gridCells[index].innerText = gridFromApp[row][column];
                }
                index++;
            }
        }
    }
} render();
function tileStyle(element , cell){
    element.style.display = "flex";
    element.style.justifyContent  = "center";
    element.style.alignItems  = "center";
    element.classList.forEach(className => {
        if(className.startsWith("tile-")){
            element.classList.remove(className)
        }
    });
    if(cell !== 0){
        element.classList.add(`tile-${cell}`);
    }
}
