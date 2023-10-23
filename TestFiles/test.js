//Below are two global object that will hold all of the variables for this game's code

/*The array 'colPositions' is used to keep track of the depth at which a piece will be placed. Each index
in this array corresponds to a column number, where index 0 is column 0 and index 6 is column 6. So when 
a piece is placed on say column 1 in an intitially empty board it will go all the way to the bottom and have
a depth of 5. Once that piece is placed, the depth at index 1 will be decremented to 4. So if the next piece
is placed in that same column, it will now be at a depth of 4. This array is very vital to this program and
allows us to see where our piece will go before we evenplace it*/

/*Array 'gridArray' becomes a 2D array when it is invoked by the 'createBoardCode' function
  This array is a 7x6 and holds the values of the pieces at each location. 0 indicates
  that location is empty, 1 indicates it is player one's piece, and 2 indicates it is
  player two's piece*/

  const board = {
    colPositions: [5, 5, 5, 5, 5, 5, 5 ],
    gridArray: [],
  }
  
  /*The variable 'playerOneTurn' is set to true when its player one's turn, and set to false
    when it is player two's turn*/
  
  /*The variable 'numMoves' keeps track of how many moves have taken place. By default it is set to zero, but 
    once a player clicks to place a piece, it will be icrmented by 1 everytime*/
    
  const game = {
    locations: [],
    children: [],
    playerOneTurn: true,
    playerOneScore: 0,
    playerTwoScore: 0,
    numMoves: 0,
    gameActive: true
  }
    
  window.onload = function() {
  
    createGridArray();
    setBoard();
  
  }
  
  function createGridArray() {
  
    /*This function sets up a 7x6 array named 'board' and
      makes every index in the array equal to 0. This signifies 
      that our connect 4 board is empty*/
    
    for(let i = 0; i < 6; i++) {
    
        board.gridArray[i] = [];
    
        for(let j = 0; j < 7; j++) {
    
          board.gridArray[i][j] = 0;
    
        }
    }
  
  }
  
  function setBoard() {
  
  
    /*The 'setBoard' function sets up the visual board that is seen
      on the page. Which is different from the board array that the 'creatBoardCode'
      function sets up. That array is used to check for wins.*/
  
    for(let i = 0; i < 7; i ++) {
  
      /*The div below will be created 7 times becuase we want 7
        columns in our connect 4 board*/
  
      let col = document.createElement("div");
  
      /*The class name for every column is set to 'col' that we can
        easily target every div by only using one css identifier*/
  
      col.className = "col";
  
      /*The id for each div however is unique and is based on the order 
        they were created in. The first column will have the name 'col 0',
        then the second 'col 1', and so on.*/
  
      col.id = "col " + i;
  
      /*Next each of these columns are appended to the html element 'board'
        which is also a div and was created in our html page*/
      
      document.getElementById("board").appendChild(col);
  
      /*The eventListener below calls the function 'showPosMov' when the
        mouse hovers over a column in the board. It will show where a possible
        move will be placed if a player clicks the mouse*/
      
      col.addEventListener("mouseover", showPosMov);
  
      col.addEventListener("mouseout", removePosMov);
  
      col.addEventListener("click", playSound);
      
      col.addEventListener("click", doMove);
      
      
      for (let j = 0; j < 6; j++) {
        
        let loc = document.createElement("div");
        
        loc.className = "loc";
        loc.id = "loc " + j + i;
        
        
        col.appendChild(loc);
        
      }
  
  
    }
  }
  
  function displayBoard() {
  
    for(let i = 0; i < 6; i++) {
  
      for(let j = 0; j < 7; j++) {
  
          let locVal = board.gridArray[i][j];
    
          document.getElementById("loc " + i + j).innerHTML = locVal;
      }
    }
  }
  
  function showPosMov() {
  
    if (!game.gameActive) return;
  
    let colNum = this.id[4];
  
    if(board.colPositions[colNum] < 0) return;
  
    let kids = this.children;
  
    if(game.playerOneTurn) {
      
      kids[board.colPositions[colNum]].style.backgroundColor = "rgb(255, 195, 195)";
  
    }
  
    else {
      kids[board.colPositions[colNum]].style.backgroundColor = "rgb(238, 243, 195)";
    }
  
    
  }
  
  function removePosMov() {
  
    if(!game.gameActive) return;
  
    let colNum = this.id[4];
  
    if(board.colPositions[colNum] < 0) return;
  
    let kids = this.children;
  
    kids[board.colPositions[colNum]].style.backgroundColor = "white";
    
  }
  
  function playSound() {
  
    colNum = this.id[4];
  
    console.log(board.colPositions[colNum]);
  
    if(board.colPositions[colNum] < 0) return;
  
    if(!game.gameActive) return;
  
    const mySound = new Audio("Audio/wood-tap-click.wav");
  
    mySound.play();
  }
  
  function playVictory() {
    const winSound = new Audio("Audio/trumpet1.mp3");
  
    winSound.play();
  }
  
  function doMove() {
  
    if(!game.gameActive) return;
    
    let colNum = this.id[4];
  
    let rowNum = board.colPositions[colNum];
  
    if(rowNum < 0) return;
  
    let kids = this.children;
  
  
    if(game.playerOneTurn) {
  
      game.numMoves++;
  
      board.gridArray[rowNum][colNum] = 1;
  
      kids[rowNum].style.backgroundColor = "red";
  
      if(checkForWin(1, rowNum, colNum)) {
  
        game.playerOneScore++;
  
        game.gameActive = false;
  
        playVictory();
  
        updateScore(1);
        
        showPlayAgainBtn();
  
      }
  
      else game.playerOneTurn = false;
  
  
    }
  
    else {
  
      game.numMoves++;
  
      board.gridArray[rowNum][colNum] = 2;
  
      kids[rowNum].style.backgroundColor = "yellow";
  
      if(checkForWin(2, rowNum, colNum)) {
  
        game.playerTwoScore++;
  
        game.gameActive = false;
  
        playVictory();
  
        updateScore(2)
  
        showPlayAgainBtn();
  
  
      }
  
      else game.playerOneTurn = true;
  
    }
  
  
    board.colPositions[colNum]--;
  
  }
  
  function updateScore(pId) {
  
    if(pId === 1) {
  
      console.log(game.playerOneScore);
  
      document.getElementById('b-left').innerHTML = game.playerOneScore;
  
    }
  
    else {
      document.getElementById('b-right').innerHTML = game.playerTwoScore;
    }
  }
  
  function showPlayAgainBtn() {
  
    const playAgain = document.getElementById('play-again')
    
    playAgain.style.display = 'block';
  
    playAgain.addEventListener('click', resetEverything);
  
  }
  
  function resetEverything() {
    createGridArray();
  
    game.numMoves = 0;
    game.gameActive = true;
  
    for(let i = 0; i < 7; i++) {
  
      board.colPositions[i] = 5;
  
    }
  
    for(let i = 0; i < 6; i++) {
  
      for(let j = 0; j < 7; j++) {
  
          document.getElementById("loc " + i + j).style.backgroundColor = 'white';
      }
    }
  
    for(let i = 0; i < 4; i++) {
  
      game.locations[i].removeChild(game.children[i]);
    }
  
    document.getElementById('play-again').style.display = 'none';
  
  }
  
  function checkForWin(pId, rowNum, colNum) {
  
    colNum = Number(colNum);
  
    return checkDiags1(pId, rowNum, colNum) || checkDiags2(pId, rowNum, colNum) || checkRows(pId, rowNum, colNum) || checkCols(pId, rowNum, colNum);
  
  }
  
  function showWins(winLocs) {
  
    for(let i = 0; i < 4; i++) {
      
      var crownPic = new Image(45, 45);
      crownPic.src = "Images/crown.png";
  
      game.locations[i] = document.getElementById(winLocs[i]);
  
      document.getElementById(winLocs[i]).appendChild(crownPic);
  
      game.children[i] = crownPic;
  
    }
  }
  
  function checkCols(pId, rowNum, colNum) {
  
    const winLocs = []
  
    let count = 0;
  
    let i = rowNum + 1;
    let j = rowNum - 1;
  
    while(board.gridArray[i] && board.gridArray[i][colNum] === pId) {
  
      winLocs.push("loc " + i + colNum);
  
      i++;
      count++;
    }
  
    while(board.gridArray[j] && board.gridArray[j][colNum] === pId) {
  
      winLocs.push("loc " + j + colNum);
  
      j--;
      count++;
    }
  
    if (count > 2) { 
  
      winLocs.push("loc " + rowNum + colNum)
  
      showWins(winLocs);
  
      return true;
    }
  
    else return false;
  }
  
  function checkRows(pId, rowNum, colNum) {
  
    let count = 0;
  
    let i = colNum + 1;
  
    let j = colNum - 1;
  
    const winLocs = []
  
  
    while(board.gridArray[rowNum][i] === pId) {
      winLocs.push("loc " + rowNum + i);
  
      i++;
      count++;
    }
  
    while(board.gridArray[rowNum][j] === pId) {
      winLocs.push("loc " + rowNum + j);
  
      j--;
      count++;
    }
  
    
    if (count > 2) {
  
      winLocs.push("loc " + rowNum + colNum)
  
      showWins(winLocs);
  
      return true;
  
    }
  
    else return false;
  }
  
  function checkDiags1(pId, rowNum, colNum) {
  
    let count = 0;
  
    let ir = rowNum + 1;
    let ic = colNum + 1;
  
    let jr = rowNum - 1;
    let jc = colNum - 1;
  
    const winLocs = [];
  
    while(board.gridArray[ir] && board.gridArray[ir][ic] === pId) {
  
      winLocs.push("loc " + ir + ic);
  
      count++;
      ir++;
      ic++;
    }
  
    while(board.gridArray[jr] && board.gridArray[jr][jc] === pId) {
  
      winLocs.push("loc " + jr + jc); 
  
      count++;
      jr--;
      jc--;
    }
  
    if (count > 2) {
  
      winLocs.push("loc " + rowNum + colNum)
  
      showWins(winLocs);
  
      return true;
  
    }
  
    else return false;
  
  }
  
  function checkDiags2(pId, rowNum, colNum) {
  
    let count = 0;
  
    let ir = rowNum - 1;
    let ic = colNum + 1;
  
    let jr = rowNum + 1;
    let jc = colNum - 1;
  
    const winLocs = [];
  
    while(board.gridArray[ir] && board.gridArray[ir][ic] === pId) {
  
      winLocs.push("loc " + ir + ic);
  
      count ++;
      ir--;
      ic++;
    }
  
    while(board.gridArray[jr] && board.gridArray[jr][jc] === pId) {
  
      winLocs.push("loc " + jr + jc); 
  
      count++;
      jr++;
      jc--;
    }
  
      if (count > 2) {
  
      winLocs.push("loc " + rowNum + colNum)
  
      showWins(winLocs);
  
      return true;
  
    }
  
    else return false;
  }
  