const gameboard = (() => {
  const board = ['', '', '', '', '', '', '', '', '']

  const getMark = (index) => {
    if (index > board.length) {
      return
    }
    return board[index]
  }

  const setMark = (index, marker) => {
    if (index > board.length) {
      return
    }
    board[index] = marker
  }

  const empty = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = ''
    }
  }

  return { getMark, setMark, empty }
})()

const player = (marker) => {
  return {
    getMarker: () => {
      return marker
    },
  }
}

const gameController = (() => {
  const player1 = player('X')
  const player2 = player('O')
  let currentPlayer = player1.getMarker()
  let combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const turn = (player) => {
    return player == player1.getMarker()
      ? player2.getMarker()
      : player1.getMarker()
  }

  const result = () => {
    // checks winning combs - if win comb is found returns winners marker
    for (const comb of combs) {
      let x = comb[0],
        y = comb[1],
        z = comb[2]
      if (
        gameboard.getMark(x) &&
        gameboard.getMark(x) === gameboard.getMark(y) &&
        gameboard.getMark(x) === gameboard.getMark(z)
      ) {
        return gameboard.getMark(x)
      }
    }
  }
  return { currentPlayer, turn, result }
})()

const displayController = (() => {
  // DOM cache
  const boxes = document.getElementsByClassName('box')
  const reset = document.getElementById('clr-btn')
  const msg = document.getElementById('msg')

  let handler = (e) => {
    check(e.target)
    gameOver()
  }
  // add event listeners for board boxes
  Array.from(boxes).forEach((box) => {
    box.addEventListener('click', handler)
  })

  // remove event listeners from board boxs if winning comb is found
  const gameOver = () => {
    if (gameController.result() === 'X' || gameController.result() === 'O') {
      Array.from(boxes).forEach((box) => {
        box.removeEventListener('click', handler)
      })
      msg.textContent = `${gameController.result()} is the winner!`
    }
  }

  // takes a target value checks for previous input - if none adds marker to board array and boad
  const check = (value) => {
    let boxIndex = value.dataset.index
    if (gameboard.getMark(boxIndex) != '') {
      return
    }
    updateBrd(value)
    gameboard.setMark(boxIndex, gameController.currentPlayer)
    gameController.currentPlayer = gameController.turn(
      gameController.currentPlayer
    )
    gameController.result()
  }

  const updateBrd = (el) => {
    el.textContent = gameController.currentPlayer
  }

  // clears board array and board text - reloads window if winner text is displayed
  reset.addEventListener('click', () => {
    if (msg.textContent != 'Tic-Tac-Toe') {
      window.location.reload()
    }
    gameboard.empty()
    Array.from(boxes).forEach((box) => {
      box.textContent = ''
    })
  })
})()
