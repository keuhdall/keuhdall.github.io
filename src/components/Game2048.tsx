import { useState, useEffect, useRef } from 'react'

interface Game2048Props {
  onExit: () => void
}

type Direction = 'up' | 'down' | 'left' | 'right'

export function Game2048({ onExit }: Game2048Props) {
  const [board, setBoard] = useState<number[][]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const gameRef = useRef<HTMLDivElement>(null)

  // Initialize the game board
  useEffect(() => {
    initializeBoard()
  }, [])

  // Focus management
  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus()
    }
  }, [])

  const initializeBoard = () => {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0))
    addRandomTile(newBoard)
    addRandomTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
    setWon(false)
  }

  const addRandomTile = (board: number[][]) => {
    const emptyCells: [number, number][] = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push([i, j])
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      board[randomCell[0]][randomCell[1]] = Math.random() < 0.9 ? 2 : 4
    }
  }

  const moveLeft = (board: number[][]) => {
    let moved = false
    let newScore = score

    for (let i = 0; i < 4; i++) {
      const row = board[i].filter(val => val !== 0)
      const newRow: number[] = []
      
      for (let j = 0; j < row.length; j++) {
        if (j < row.length - 1 && row[j] === row[j + 1]) {
          const merged = row[j] * 2
          newRow.push(merged)
          newScore += merged
          if (merged === 2048 && !won) {
            setWon(true)
          }
          j++ // Skip next tile
        } else {
          newRow.push(row[j])
        }
      }
      
      while (newRow.length < 4) {
        newRow.push(0)
      }
      
      if (JSON.stringify(newRow) !== JSON.stringify(board[i])) {
        moved = true
      }
      board[i] = newRow
    }

    if (moved) {
      addRandomTile(board)
      setScore(newScore)
    }

    return moved
  }

  const moveRight = (board: number[][]) => {
    let moved = false
    let newScore = score

    for (let i = 0; i < 4; i++) {
      const row = board[i].filter(val => val !== 0)
      const newRow: number[] = []
      
      for (let j = row.length - 1; j >= 0; j--) {
        if (j > 0 && row[j] === row[j - 1]) {
          const merged = row[j] * 2
          newRow.unshift(merged)
          newScore += merged
          if (merged === 2048 && !won) {
            setWon(true)
          }
          j-- // Skip next tile
        } else {
          newRow.unshift(row[j])
        }
      }
      
      while (newRow.length < 4) {
        newRow.unshift(0)
      }
      
      if (JSON.stringify(newRow) !== JSON.stringify(board[i])) {
        moved = true
      }
      board[i] = newRow
    }

    if (moved) {
      addRandomTile(board)
      setScore(newScore)
    }

    return moved
  }

  const moveUp = (board: number[][]) => {
    let moved = false
    let newScore = score

    for (let j = 0; j < 4; j++) {
      const column = []
      for (let i = 0; i < 4; i++) {
        if (board[i][j] !== 0) {
          column.push(board[i][j])
        }
      }
      
      const newColumn: number[] = []
      for (let i = 0; i < column.length; i++) {
        if (i < column.length - 1 && column[i] === column[i + 1]) {
          const merged = column[i] * 2
          newColumn.push(merged)
          newScore += merged
          if (merged === 2048 && !won) {
            setWon(true)
          }
          i++ // Skip next tile
        } else {
          newColumn.push(column[i])
        }
      }
      
      while (newColumn.length < 4) {
        newColumn.push(0)
      }
      
      for (let i = 0; i < 4; i++) {
        if (board[i][j] !== newColumn[i]) {
          moved = true
        }
        board[i][j] = newColumn[i]
      }
    }

    if (moved) {
      addRandomTile(board)
      setScore(newScore)
    }

    return moved
  }

  const moveDown = (board: number[][]) => {
    let moved = false
    let newScore = score

    for (let j = 0; j < 4; j++) {
      const column = []
      for (let i = 0; i < 4; i++) {
        if (board[i][j] !== 0) {
          column.push(board[i][j])
        }
      }
      
      const newColumn: number[] = []
      for (let i = column.length - 1; i >= 0; i--) {
        if (i > 0 && column[i] === column[i - 1]) {
          const merged = column[i] * 2
          newColumn.unshift(merged)
          newScore += merged
          if (merged === 2048 && !won) {
            setWon(true)
          }
          i-- // Skip next tile
        } else {
          newColumn.unshift(column[i])
        }
      }
      
      while (newColumn.length < 4) {
        newColumn.unshift(0)
      }
      
      for (let i = 0; i < 4; i++) {
        if (board[i][j] !== newColumn[i]) {
          moved = true
        }
        board[i][j] = newColumn[i]
      }
    }

    if (moved) {
      addRandomTile(board)
      setScore(newScore)
    }

    return moved
  }

  const move = (direction: Direction) => {
    if (gameOver) return

    const newBoard = board.map(row => [...row])
    let moved = false

    switch (direction) {
      case 'left':
        moved = moveLeft(newBoard)
        break
      case 'right':
        moved = moveRight(newBoard)
        break
      case 'up':
        moved = moveUp(newBoard)
        break
      case 'down':
        moved = moveDown(newBoard)
        break
    }

    if (moved) {
      setBoard(newBoard)
      checkGameOver(newBoard)
    }
  }

  const checkGameOver = (board: number[][]) => {
    // Check if there are empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          return
        }
      }
    }

    // Check if any moves are possible
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board[i][j]
        if (
          (i > 0 && board[i - 1][j] === current) ||
          (i < 3 && board[i + 1][j] === current) ||
          (j > 0 && board[i][j - 1] === current) ||
          (j < 3 && board[i][j + 1] === current)
        ) {
          return
        }
      }
    }

    setGameOver(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        e.preventDefault()
        move('up')
        break
      case 's':
      case 'arrowdown':
        e.preventDefault()
        move('down')
        break
      case 'a':
      case 'arrowleft':
        e.preventDefault()
        move('left')
        break
      case 'd':
      case 'arrowright':
        e.preventDefault()
        move('right')
        break
      case 'q':
        e.preventDefault()
        onExit()
        break
      case 'r':
        e.preventDefault()
        initializeBoard()
        break
    }
  }

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      0: '#000000',
      2: '#00ff00',
      4: '#00ff00',
      8: '#00ff00',
      16: '#00ff00',
      32: '#00ff00',
      64: '#00ff00',
      128: '#00ff00',
      256: '#00ff00',
      512: '#00ff00',
      1024: '#00ff00',
      2048: '#ffff00'
    }
    return colors[value] || '#00ff00'
  }

  const formatTile = (value: number) => {
    if (value === 0) return '    '
    return value.toString().padStart(4)
  }

  return (
    <div 
      ref={gameRef}
      className="game-2048"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <div className="game-header">
        <div>Score: {score}</div>
        <div>2048 Game</div>
        <div>Press Q to quit, R to restart</div>
      </div>
      
      {won && !gameOver && (
        <div className="game-message won">
          You won! You reached 2048! Press R to continue or Q to quit.
        </div>
      )}
      
      {gameOver && (
        <div className="game-message game-over">
          Game Over! Final Score: {score}. Press R to restart or Q to quit.
        </div>
      )}
      
      <div className="game-board">
        {board.map((row, i) => (
          <div key={i} className="game-row">
            {row.map((cell, j) => (
              <div 
                key={j} 
                className="game-cell"
                style={{ 
                  color: getTileColor(cell),
                  backgroundColor: cell === 0 ? '#000000' : '#001100'
                }}
              >
                {formatTile(cell)}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="game-controls">
        <div>Controls: WASD or Arrow Keys</div>
        <div>Goal: Combine tiles to reach 2048!</div>
      </div>
    </div>
  )
}
