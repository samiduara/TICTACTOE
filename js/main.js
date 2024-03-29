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
  render();

};

function render(){
  board.forEach(function(id, idx){
      let div = document.getElementById(`id${idx}`);
      div.style.backgroundColor = COLORS[id];            
  });

  if(winner){
      
      if(winner === 'T'){
          msgEl.textContent = 'Tie! Try Again!';
      } else {
          msgEl.textContent =`${COLORS[winner].toUpperCase()} Wins!`
      }
  } else {
      msgEl.textContent = `${COLORS[turn].toUpperCase()}'s Turn`;
  }
}

function handlePlayClick(evt){
  let idx = evt.target.id.replace('id', '');
  if(isNaN(idx) || winner) return;
  if(board[idx] !== 0) return;
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner(){
  // initialize all possible win routes
  let sum = [0, 0, 0, 0, 0, 0, 0, 0, ];
  let winner;

  if(sum.indexOf(WIN[0]) >= 0 || sum.indexOf(WIN[1]) >= 0){
      if(sum.indexOf(WIN[0]) >= 0){
          winner = sum.indexOf(WIN[0]);
      } else {
          winner = sum.indexOf(WIN[1]); 
      }
  };

  if(winner >= 0){
      return sum[winner] / 3;
  } else if(sum.indexOf(0) === -1){
      return 'T';
  }
}