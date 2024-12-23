import type { Board, Position } from '@/types/global'
import { BoardElements } from '@/constants/global'
import { Dijkstra } from '@/algorithms/Dijkstra'

export class BoardManager
{
  private board: Board

  constructor(board: Board)
  {
    this.board = board
  }

  display(): void
  {
    console.log(this.board.map((row) => row.join('')).join('\n'))
  }

  solve(): Board
  {
    const dijkstra = new Dijkstra(this.board)

    return dijkstra.solve()
  }

  setElement(position: Position, element: BoardElements): void
  {
    const [x, y] = position

    this.board[x][y] = element
  }

  getBoard(): Board
  {
    return this.board
  }
}
