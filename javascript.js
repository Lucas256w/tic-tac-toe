

const gameBoard = (() => {

    let board = ['','','','','','','','',''];
    let winner = '';
    let tempCheckWinner = ['','','']
    const restartButton = document.querySelector('button')

    restartButton.addEventListener('click', () =>{
        gameBoard.board = ['','','','','','','','',''];
        gameBoard.winner = ''
        gameBoard.tempCheckWinner = ['','','']
        displayController.winnerText.textContent = `Player X's turn`
        displayController.currentMarker = 'X'
        displayController.showBoard()
    });

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const checkWin = () => {
        for (i = 0; i< winConditions.length; i++) {
            for (j = 0; j< winConditions[i].length; j++) {
                gameBoard.tempCheckWinner[j] = gameBoard.board[winConditions[i][j]]
            }
            if (gameBoard.tempCheckWinner[0] == gameBoard.tempCheckWinner[1] && gameBoard.tempCheckWinner[1] == gameBoard.tempCheckWinner[2] && gameBoard.tempCheckWinner[0] != '') {
                gameBoard.winner = gameBoard.tempCheckWinner[0]
                console.log(gameBoard.board)
                return gameBoard.winner
            }
        }
        return ''
      }

    return {board, winConditions, checkWin, winner, tempCheckWinner}
})();

function makePLayer (name, marker) {
    
    let score = 0;
    const getScore = () => score;
    const wins = () => score++;

    return {name, marker, getScore, wins}
}

const displayController = (() => {
    const squares = document.querySelectorAll('.square');
    const winnerText = document.querySelector('#winnerText')
    let currentMarker = 'X'


    squares.forEach( press => {
        press.addEventListener('click', (e) => {
            if (press.innerHTML == '' && gameBoard.winner == '') {
                if (displayController.currentMarker == 'X') {
                    gameBoard.board[Number(press.id)] = 'X'
                    displayController.currentMarker = 'O'
                } else {
                    gameBoard.board[Number(press.id)] = 'O'
                    displayController.currentMarker = 'X'
                }
        }
            showBoard()
            gameBoard.winner = gameBoard.checkWin()
            if (gameBoard.winner != '') {
                displayController.winnerText.textContent = `Congratulations ${gameBoard.winner} wins!`
            } else if (gameBoard.board.includes('')) {
                displayController.winnerText.textContent = `Player ${displayController.currentMarker}'s turn`
            } else {
                displayController.winnerText.textContent = `It's a tie!`
            }
            return
        })
    })

    const showBoard = () => {
        for (i = 0; i< gameBoard.board.length; i++) {
            if (gameBoard.board[i] == 'X') {
                squares[i].innerHTML = 'X';
            } else if (gameBoard.board[i] == 'O') {
                squares[i].innerHTML = 'O';
            } else {
                squares[i].innerHTML = ''
            }
        }
        return
    }

    
    return {showBoard, winnerText, currentMarker}

})();
const playerOne = makePLayer('jack', 'X')
const playerTwo = makePLayer('Chloe', 'O')
displayController.showBoard()

const dialog = document.querySelector('dialog');
dialog.showModal();