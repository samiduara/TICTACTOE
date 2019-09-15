const COLORS = {
  '0': 'white',
  '1': 'red',
  '-1': 'yellow'
};

const WIN = [3, -3];

const WINTABLE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [0, 4, 6]
];
/*----- app's state (variables) -----*/ 
let board, turn, winner

/*----- cached element references -----*/ 

let msgEl = document.getElementById('msg');

/*----- event listeners -----*/ 
document.querySelector('#game-board')
.addEventListener('click', handlePlayClick);

document.getElementById('reset').addEventListener('click', init);

/*----- functions -----*/
init();

function init(){
  board = [0,0,0,0,0,0,0,0,0];
  turn = 1;
  winner = null; 

}

function render(){
  board.forEach(function(cell, idx){
      let div = document.getElementById(`cell${idx}`);
      div.style.backgroundColor = COLORS[cell];            
  });

  if(winner){
      
      if(winner === 'X'){
          msgEl.textContent = 'Tie! Try Again!';
      } else {
          msgEl.textContent =`${COLORS[winner].toUpperCase()} Wins!`
      }
  } else {
      msgEl.textContent = `${COLORS[turn].toUpperCase()}'s Turn`;
  }
}

function handlePlayClick(evt){
  let idx = evt.target.id.replace('cell', '');
  if(isNaN(idx) || winner) return;
  if(board[idx] !== 0) return;
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner(){
  // initialize all possible win routes
  let play = [0];
  let winningLine;

  if(play.indexOf(WIN[0]) >= 0 || play.indexOf(WIN[1]) >= 0){
      if(play.indexOf(WIN[0]) >= 0){
          winningLine = play.indexOf(WIN[0]);
      } else {
          winningLine = play.indexOf(WIN[1]); 
      }
  };

  if(winningLine >= 2){
      return play[winningLine] / 3;
  } else if(play.indexOf(0) === -1){
      return 'X';
  }
}