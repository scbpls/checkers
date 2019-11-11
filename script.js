const size = 10;
var board = [];
var turn = 0;

function checkTurn(i, j) {
    if((board[i][j].firstChild.className == "white") && (turn == 0)) {
        return true;
    }
    if((board[i][j].firstChild.className == "black") && (turn == 1)) {
        return true;
    }
    return false;
}

function setUp() {
    for (let i = 0; i < size; i++) {
        board[i] = [];
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[i][j] = createElement(i, j);
        }
    }
    createPiece();
}

function createElement(i, j) {
    let index = document.createElement('div');
    let attClass = document.createAttribute('class');
    let attId = document.createAttribute('id');
    let attTaken = document.createAttribute('taken');
    attClass.value = i;
    attId.value = i+''+j;
    attTaken.value = 0;
    index.setAttributeNode(attClass);
    index.setAttributeNode(attId);
    index.setAttributeNode(attTaken);
    index.style.height = "80px";
    index.style.width = "80px";
    if ((parseInt(attId.value) + (Math.floor(parseInt(attId.value) / 10))) % 2 == 0) {
        index.style.backgroundColor = "white";
    } else {
        index.style.backgroundColor = "black";
    }
    game.appendChild(index);
    return index;
}

function createPiece() {
    for (let i = 0; i < size; i++) {
         if (i < 4) {
             for (let j = 0; j < 5; j++) {
                 let k = (j * 2 + i + 1) % 10;
                 board[i][k].attributes["taken"].value = 1;
                 let piece = document.createElement('span');
                 let attClass = document.createAttribute('class');
                 let attId = document.createAttribute('id');
                 attClass.value = "black";
                 attId.value = i+''+j+''+"span";
                 piece.setAttributeNode(attClass);
                 piece.setAttributeNode(attId);
                 board[i][k].appendChild(piece);
                 let pic = document.createElement('img');
                 pic.src = "black.png";
                 pic.style.height = "80px";
                 pic.style.width = "80px";
                 piece.appendChild(pic);
                 let focus = document.createAttribute('onclick');
                 focus.value = "goDown("+i+","+k+");";
                 piece.setAttributeNode(focus);
             }
         } else if (i > size - 5) { 
             for (let j = 0; j < 5; j++) {
                 let k = (j * 2 + i + 1) % 10;
                 board[i][k].attributes["taken"].value = 1;
                 let piece = document.createElement('span');
                 let attClass = document.createAttribute('class');
                 let attId = document.createAttribute('id');
                 attClass.value = "white";
                 attId.value = i+''+j+''+"span";
                 piece.setAttributeNode(attClass);
                 piece.setAttributeNode(attId);
                 board[i][k].appendChild(piece);
                 let pic = document.createElement('img');
                 pic.src = "white.png";
                 pic.style.height = "80px";
                 pic.style.width = "80px";
                 piece.appendChild(pic);
                 let focus = document.createAttribute('onclick');
                 focus.value = "goTop("+i+","+k+");";
                 piece.setAttributeNode(focus);
             }
         }
    }
}

function move(originI, originJ, destI, destJ, target, attackI, attackJ) {
    const original = board[originI][originJ];
    const desc = board[destI][destJ];
    let temp = original.innerHTML;
    original.attributes["taken"].value = 0;
    original.innerHTML = "";
    desc.innerHTML = temp;
    desc.attributes["onclick"].value = "";
    target = desc.firstChild.className == 'black' ? 'goDown' : 'goTop';
    desc.firstChild.attributes["onclick"].value = target+`(${destI},${destJ})`;
    let taken = document.createAttribute('taken');
    taken.value = 1;
    board[destI][destJ].setAttributeNode(taken);
    cleanChoice();
    if (attackI && attackJ) {
        removeElement(attackI, attackJ);
        turn = (turn + 1) % 2;
    }
    turn = (turn + 1) % 2;
}

function goDown(i, j) {
    cleanChoice();
    if (checkTurn(i, j) == false) {
        return;
    }
    if (j > 0) {
        var indexLeft = document.getElementById((i+1)+''+(j-1));
        if (indexLeft.attributes["taken"].value == 0) {
            indexLeft.style.backgroundColor = "#a4a4a4";
            let choosen = document.createAttribute('onclick');
            choosen.value = "move("+i+','+j+','+(i+1)+','+(j-1)+",'goDown');";
            indexLeft.setAttributeNode(choosen);
        }
        if (j > 1) {
            if(i < size - 2) {
                if ((board[i+2][j-2].attributes["taken"].value == 0) && (board[i+1][j-1].firstChild) && (i < (size - 2))) {
                    if (board[i+1][j-1].firstChild.className == "white") {
                        let indexLeftFurther1 = document.getElementById((i+2)+''+(j-2));
                        indexLeftFurther1.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i+2)+','+(j-2)+",'goDown',"+(i+1)+','+(j-1)+");";
                        indexLeftFurther1.setAttributeNode(choosen);
                    }
                }
            }
            if (i > 1) {
                if ((board[i-2][j-2].attributes["taken"].value == 0) && (board[i-1][j-1].firstChild) && (i > 1)) {
                    if (board[i-1][j-1].firstChild.className == "white") {
                        let indexLeftFurther2 = document.getElementById((i-2)+''+(j-2));
                        indexLeftFurther2.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i-2)+','+(j-2)+",'goTop',"+(i-1)+','+(j-1)+");";
                        indexLeftFurther2.setAttributeNode(choosen);
                    }
                }
            }
        }
    }
    if (j < size - 1) {
        var indexRight = document.getElementById((i+1)+''+(j+1));
        if (indexRight.attributes["taken"].value == 0) {
            indexRight.style.backgroundColor = "#a4a4a4";
            let choosen = document.createAttribute('onclick');
            choosen.value = "move("+i+','+j+','+(i+1)+','+(j+1)+",'goDown');";
            indexRight.setAttributeNode(choosen);
        }
        if (j < size - 2) {
            if ( i < size - 2){
                if (board[i+2][j+2].attributes["taken"].value == 0 && board[i+1][j+1].firstChild && (i < (size - 2))) {
                    if (board[i+1][j+1].firstChild.className == "white") {
                        let indexRightFurther1 = document.getElementById((i+2)+''+(j+2));
                        indexRightFurther1.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i+2)+','+(j+2)+",'goDown',"+(i+1)+','+(j+1)+");";
                        indexRightFurther1.setAttributeNode(choosen);
                    }
                }
            }
            if (i > 1) {
                if (board[i-2][j+2].attributes["taken"].value == 0 && board[i-1][j+1].firstChild && (i > 1)) {
                    if (board[i-1][j+1].firstChild.className == "white") {
                        let indexRightFurther2 = document.getElementById((i-2)+''+(j+2));
                        indexRightFurther2.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i-2)+','+(j+2)+",'goTop',"+(i-1)+','+(j+1)+");";
                        indexRightFurther2.setAttributeNode(choosen);
                    }
                }
            }
        }
    }
}

function goTop(i, j) {
    cleanChoice();
    if (checkTurn(i, j) == false) {
        return;
    }
    if (j > 0) {
        var indexLeft = document.getElementById((i-1)+''+(j-1));
        if (indexLeft.attributes["taken"].value == 0) {
            indexLeft.style.backgroundColor = "#a4a4a4";
            let choosen = document.createAttribute('onclick');
            choosen.value = "move("+i+','+j+','+(i-1)+','+(j-1)+",'goTop');";
            indexLeft.setAttributeNode(choosen);
        }
        if (j > 1) {
            if(i > 1){
                if (board[i-2][j-2].attributes["taken"].value == 0 && board[i-1][j-1].firstChild) {
                    if(board[i-1][j-1].firstChild.className == "black"){
                        let indexLeftFurther1 = document.getElementById((i-2)+''+(j-2));
                        indexLeftFurther1.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i-2)+','+(j-2)+",'goTop',"+(i-1)+','+(j-1)+");";
                        indexLeftFurther1.setAttributeNode(choosen);
                    }
                }
            }
            if(i < (size - 2)){
                if (board[i+2][j-2].attributes["taken"].value == 0 && board[i+1][j-1].firstChild) {
                    if(board[i+1][j-1].firstChild.className == "black"){
                        let indexLeftFurther2 = document.getElementById((i+2)+''+(j-2));
                        indexLeftFurther2.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i+2)+','+(j-2)+",'goDown',"+(i+1)+','+(j-1)+");";
                        indexLeftFurther2.setAttributeNode(choosen);
                    }
                } 
            }
        }
    }
    if (j < size - 1) {
        var indexRight = document.getElementById((i-1)+''+(j+1));
        if (indexRight.attributes["taken"].value == 0) {
            indexRight.style.backgroundColor = "#a4a4a4";
            let choosen = document.createAttribute('onclick');
            choosen.value = "move("+i+','+j+','+(i-1)+','+(j+1)+",'goTop')";
            indexRight.setAttributeNode(choosen);
        }
        if (j < size - 2) {
            if (i > 1) {
                if (board[i-2][j+2].attributes["taken"].value == 0 && board[i-1][j+1].firstChild && (i > 1)) {
                    if (board[i-1][j+1].firstChild.className == "black") {
                        let indexRightFurther1 = document.getElementById((i-2)+''+(j+2));
                        indexRightFurther1.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i-2)+','+(j+2)+",'goTop',"+(i-1)+','+(j+1)+");";
                        indexRightFurther1.setAttributeNode(choosen);
                    }
                }
            }
            if(i < (size - 2)) {
                if (board[i+2][j+2].attributes["taken"].value == 0 && board[i+1][j+1].firstChild && (i < (size - 2))) {
                    if (board[i+1][j+1].firstChild.className == "black") {
                        let indexRightFurther2 = document.getElementById((i+2)+''+(j+2));
                        indexLeftFurther2.style.backgroundColor = "red";
                        let choosen = document.createAttribute('onclick');
                        choosen.value = "move("+i+','+j+','+(i+2)+','+(j+2)+",'goDown',"+(i+1)+','+(j+1)+");";
                        indexRightFurther2.setAttributeNode(choosen);
                    }
                } 
            }
        }
    }
}

function cleanChoice() {
    for (let k = 0; k < size; k++) {
        for (let l = 0; l < size; l++) {
            if ((l + k) % 2 == 1 ) {
                board[k][l].style.backgroundColor = "black";
            }
        }
    }
}

function removeElement(i, j) {
    let child = board[i][j].firstChild;
    child.parentNode.removeChild(child);
    board[i][j].attributes["taken"].value = 0;
}
