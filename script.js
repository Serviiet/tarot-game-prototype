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
