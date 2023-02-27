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

const gameController = (() => {})()

const displayController = (() => {})()
