let playerCount = 0;
let player1 = null;
let player2 = null;
let betAmount = 0;
let gameState = 'waiting';

const stateElement = document.getElementById('state');
const betAmountElement = document.getElementById('betAmount');
const joinGameButton = document.getElementById('joinGame');
const placeBetButton = document.getElementById('placeBet');
const endGameButton = document.getElementById('endGame');

joinGameButton.addEventListener('click', () => {
    if (playerCount < 2) {
        playerCount++;
        if (playerCount === 1) {
            player1 = 'Joueur 1';
        } else {
            player2 = 'Joueur 2';
        }
        
        if (playerCount === 2) {
            gameState = 'waitingForBets';
            stateElement.textContent = 'En attente des mises des joueurs...';
            placeBetButton.disabled = false;
        }
    }
});

placeBetButton.addEventListener('click', () => {
    if (gameState === 'waitingForBets') {
        betAmount += 1; // chaque joueur mise 1 ETH (simulé)
        betAmountElement.textContent = betAmount;
        if (betAmount >= 2) { // Lorsque les deux joueurs ont misé
            gameState = 'gameInProgress';
            stateElement.textContent = 'Le jeu commence !';
            placeBetButton.disabled = true;
            endGameButton.disabled = false;
        }
    }
});

endGameButton.addEventListener('click', () => {
    if (gameState === 'gameInProgress') {
        const winner = Math.random() < 0.5 ? player1 : player2;
        gameState = 'gameEnded';
        stateElement.textContent = `Le jeu est terminé ! ${winner} a gagné.`;
        endGameButton.disabled = true;
        betAmount = 0;
        betAmountElement.textContent = betAmount;
    }
});
const suits = ['♠', '♥', '♦', '♣'];
const values = ['1','2','3','4','5','6','7','8','9','10','V','C','D','R'];
const trumps = Array.from({length: 21}, (_, i) => `Atout ${i + 1}`);
const excuse = ['Excuse'];

let deck = [];

function createDeck() {
  deck = [];
  suits.forEach(suit => {
    values.forEach(value => deck.push(`${value}${suit}`));
  });
  deck.push(...trumps);
  deck.push(...excuse);
}

function drawCard() {
  if (deck.length === 0) createDeck();
  const index = Math.floor(Math.random() * deck.length);
  const card = deck.splice(index, 1)[0];
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.textContent = card;
  document.getElementById('player-hand').appendChild(cardEl);
}

function resetGame() {
  document.getElementById('player-hand').innerHTML = '';
  createDeck();
}

createDeck();
