const blocks = document.querySelectorAll(".block");
const playerText = document.getElementById("player");
const errorText = document.getElementById("error");
//  const againGame= window.location.reload(false);
let choose = true;
let gameOver = false;
let player = "X";
let d=0,c=0;
const mass = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const randomNumber=[1,2,3,4,5,6,7,8,9];
let z = 0;
function changeChose(a) {
  if (a === 1) {
    choose = true;
     
  } else {
    choose = false;
  }
}
function reloadPage(a) {
  if (a === 1) {
    window.location.reload(true);
  }
    
}

function startGame() {
  playerText.textContent = `${player}'s Turn!`;

  blocks.forEach((block) =>
    block.addEventListener("click", (event) => chooseArea(event, block))
  );
}

function chooseArea(event, block) {
    if(choose){
        if (block.textContent === "") {
          block.textContent = player;
          let x = event.target.id;
            if (player === "X") {
              if (x === "1") {mass[0][0] = 1; randomNumber.splice(randomNumber.indexOf(1),1);}
              if (x === "2") {mass[0][1] = 1; randomNumber.splice(randomNumber.indexOf(2),1);}
              if (x === "3") {mass[0][2] = 1;randomNumber.splice(randomNumber.indexOf(3),1);}
              if (x === "4") {mass[1][0] = 1;randomNumber.splice(randomNumber.indexOf(4),1);}
              if (x === "5") {mass[1][1] = 1;randomNumber.splice(randomNumber.indexOf(5),1);}
              if (x === "6") {mass[1][2] = 1;randomNumber.splice(randomNumber.indexOf(6),1);}
              if (x === "7") {mass[2][0] = 1;randomNumber.splice(randomNumber.indexOf(7),1);}
              if (x === "8") {mass[2][1] = 1;randomNumber.splice(randomNumber.indexOf(8),1);}
              if (x === "9") {mass[2][2] = 1;randomNumber.splice(randomNumber.indexOf(9),1);}
              blocks.forEach((block) => (block.style.pointerEvents = "none"));
            }            
            turnPlayer();
            
              d= setTimeout(() => {
                x = randomNumber[Math.floor(Math.random() * randomNumber.length)];
              document.getElementById(x).textContent=player;
              randomNumber.splice(randomNumber.indexOf(x),1);                 
                if (x === 1) {mass[0][0] = 2;}
                if (x === 2) {mass[0][1] = 2;}
                if (x === 3) {mass[0][2] = 2;}
                if (x === 4) {mass[1][0] = 2;}
                if (x === 5) {mass[1][1] = 2;}
                if (x === 6) {mass[1][2] = 2;}
                if (x === 7) {mass[2][0] = 2;}
                if (x === 8) {mass[2][1] = 2;}
                if (x === 9) {mass[2][2] = 2;}
                blocks.forEach((block) => (block.style.pointerEvents = "all"));           
              turnPlayer();
              checkWin();
            check();
            if (gameOver) {
              if (player === "O") {playerText.textContent = `Oyun bitdi,X qazandı`;}
              else if(player==="X") {playerText.textContent = `Oyun bitdi,O qazandı`;console.log(mass)}
              blocks.forEach((block) => (block.style.pointerEvents = "none"));
              clearTimeout(d);
              d=0;
            }
              }, 1000);     
          } else {
            errorText.textContent = "Olmaz";
            block.style.border = "2px solid red";
            setTimeout(() => {
              errorText.textContent = "";
              block.style.border = "1px solid black";
            }, 2500);
          }
          checkWin();
            check();
            if (gameOver) {
              if (player === "O") {playerText.textContent = `Oyun bitdi,X qazandı`;}
              else if(player==="X") {playerText.textContent = `Oyun bitdi,O qazandı`;console.log(mass)}
              blocks.forEach((block) => (block.style.pointerEvents = "none"));
              clearTimeout(d);
              d=0;
            }
    }
    else if(!choose){
  if (block.textContent === "") {
    block.textContent = player;
    let x = event.target.id;
    if (player === "X") {
      if (x === "1") mass[0][0] = 1;
      if (x === "2") mass[0][1] = 1;
      if (x === "3") mass[0][2] = 1;
      if (x === "4") mass[1][0] = 1;
      if (x === "5") mass[1][1] = 1;
      if (x === "6") mass[1][2] = 1;
      if (x === "7") mass[2][0] = 1;
      if (x === "8") mass[2][1] = 1;
      if (x === "9") mass[2][2] = 1;
    }
    else if (player === "O") {
      if (x === "1") mass[0][0] = 2;
      if (x === "2") mass[0][1] = 2;
      if (x === "3") mass[0][2] = 2;
      if (x === "4") mass[1][0] = 2;
      if (x === "5") mass[1][1] = 2;
      if (x === "6") mass[1][2] = 2;
      if (x === "7") mass[2][0] = 2;
      if (x === "8") mass[2][1] = 2;
      if (x === "9") mass[2][2] = 2;
    }    
    turnPlayer();
  } else {
    errorText.textContent = "Olmaz";
    block.style.border = "2px solid red";
    setTimeout(() => {
      errorText.textContent = "";
      block.style.border = "1px solid black";
    }, 2500);
  }
  checkWin();
    check();
    if (gameOver) {
      if (player === "X") playerText.textContent = `Oyun bitdi,O qazandı`;
      else playerText.textContent = `Oyun bitdi,X qazandı`;
      blocks.forEach((block) => (block.style.pointerEvents = "none"));
    }
}
  
}

function turnPlayer() {
  if (player === "X") {
    player = "O";
    playerText.textContent = `${player}'s Sırası!`;
    return;
  } else if (player === "O") {
    player = "X";
    playerText.textContent = `${player}'s Sırası!`;
    return;
  }
}
function checkWin() {
  checkRows();
  checkColumn();
  checkDiogonal();
}

function checkRows() {
  if (
    mass[0][0] !== 0 &&
    mass[0][0] === mass[0][1] &&
    mass[0][1] === mass[0][2]
  )
    gameOver = true;
  if (
    mass[1][0] !== 0 &&
    mass[1][0] === mass[1][1] &&
    mass[1][1] === mass[1][2]
  )
    gameOver = true;
  if (
    mass[2][0] !== 0 &&
    mass[2][0] === mass[2][1] &&
    mass[2][1] === mass[2][2]
  )
    gameOver = true;
}
function checkColumn() {
  if (
    mass[0][0] !== 0 &&
    mass[0][0] === mass[1][0] &&
    mass[1][0] === mass[2][0]
  )
    gameOver = true;
  if (
    mass[0][1] !== 0 &&
    mass[0][1] === mass[1][1] &&
    mass[1][1] === mass[2][1]
  )
    gameOver = true;
  if (
    mass[0][2] !== 0 &&
    mass[0][2] === mass[1][2] &&
    mass[1][2] === mass[2][2]
  )
    gameOver = true;
}
function checkDiogonal() {
  if (
    mass[1][1] !== 0 &&
    mass[0][0] === mass[1][1] &&
    mass[1][1] === mass[2][2]
  )
    gameOver = true;
  if (
    mass[1][1] !== 0 &&
    mass[0][2] === mass[1][1] &&
    mass[1][1] === mass[2][0]
  )
    gameOver = true;
}
function check() {
  if (
    mass[0][0] !== 0 &&
    mass[0][1] !== 0 &&
    mass[0][2] !== 0 &&
    mass[1][0] !== 0 &&
    mass[1][1] !== 0 &&
    mass[1][2] !== 0 &&
    mass[2][0] !== 0 &&
    mass[2][1] !== 0 &&
    mass[2][2] !== 0 &&
    gameOver !== true
  ) {
    playerText.textContent="Bərabərə";
  }
}

startGame();
