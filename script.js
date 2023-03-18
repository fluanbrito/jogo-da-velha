// selecionando os elementos do jogo
const gameCells = document.querySelectorAll('.game__cell');
const gameResult = document.querySelector('.game__result');
const player1Score = document.querySelector('.game__score-player1');
const player2Score = document.querySelector('.game__score-player2');
const restartButton = document.createElement('button');

let currentPlayer = 'X';
let moves = 0;
let gameOver = false;
let player1Name, player2Name;
let player1Wins = 0, player2Wins = 0;

// adicionando um listener de evento para o formulário
document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();
    player1Name = document.querySelector('#player1').value;
    player2Name = document.querySelector('#player2').value;
    document.querySelector('.header__title').textContent = `${player1Name} (X) vs (O) ${player2Name}`;
    event.target.reset();
});

// adicionando um listener de evento para cada célula do jogo
gameCells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

// função para manipular o clique em uma célula
function handleCellClick(event) {
    if (gameOver) return;
    if (event.target.textContent !== '') return;

    event.target.textContent = currentPlayer;
    moves++;

    if (checkForWinner()) {
        gameOver = true;
        gameResult.textContent = `${currentPlayer} venceu!`;
        if (currentPlayer === 'X') {
            player1Wins++;
            player1Score.textContent = player1Wins;
        } else {
            player2Wins++;
            player2Score.textContent = player2Wins;
        }
        restartButton.textContent = 'Recomeçar';
        gameResult.appendChild(restartButton);
        restartButton.addEventListener('click', restartGame);
        return;
    }

    if (moves === 9) {
        gameOver = true;
        gameResult.textContent = 'Empate!';
        restartButton.textContent = 'Recomeçar';
        gameResult.appendChild(restartButton);
        restartButton.addEventListener('click', restartGame);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// função para verificar se há um vencedor
function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return gameCells[index].textContent === currentPlayer;
        });
    });
}

// função para reiniciar o jogo
function restartGame() {
    currentPlayer = 'X';
    moves = 0;
    gameOver = false;
    gameResult.textContent = '';
    gameCells.forEach((cell) => {
        cell.textContent = '';
    });
    restartButton.remove();
}
