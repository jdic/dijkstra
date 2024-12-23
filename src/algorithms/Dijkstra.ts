import { BoardElements, Directions } from '@/constants/global'
import type { Board, Position } from '@/types/global'

export class Dijkstra
{
  private board: Board
  private startPosition: Position
  private endPosition: Position
  private rows: number
  private cols: number

  constructor(board: Board)
  {
    this.board = board
    this.rows = board.length
    this.cols = board[0].length
    this.startPosition = this.findElementPosition(BoardElements.Start)
    this.endPosition = this.findElementPosition(BoardElements.End)
  }

  private findElementPosition(element: BoardElements): Position
  {
    for (let row = 0; row < this.rows; row++)
    {
      for (let col = 0; col < this.cols; col++)
      {
        if (this.board[row][col] === element)
        {
          return [row, col]
        }
      }
    }

    throw new Error(`Element ${element} not found`)
  }

  private create2DArray<T>(defaultValue: T): T[][]
  {
    return Array.from({ length: this.rows }, () =>
    {
      return Array(this.cols).fill(defaultValue)
    })
  }

  private reconstructPath(distances: number[][]): Position[]
  {
    const path: Position[] = []
    let [x, y] = this.endPosition

    if (distances[x][y] === Infinity)
    {
      return path
    }

    while (x !== this.startPosition[0] || y !== this.startPosition[1])
    {
      path.push([x, y])

      for (const [dx, dy] of Directions)
      {
        const nx = x + dx
        const ny = y + dy

        const isValid =
          nx >= 0 && ny >= 0 && nx < this.rows && ny < this.cols &&
          distances[nx][ny] === distances[x][y] - 1

        if (isValid)
        {
          x = nx
          y = ny

          break
        }
      }
    }

    path.push(this.startPosition)

    return path.reverse()
  }

  solve(): Board
  {
    const distances = this.create2DArray(Infinity)
    const visited = this.create2DArray(false)
    const queue: Position[] = [this.startPosition]

    distances[this.startPosition[0]][this.startPosition[1]] = 0

    while (queue.length > 0)
    {
      queue.sort((a, b) => distances[a[0]][a[1]] - distances[b[0]][b[1]])

      const [x, y] = queue.shift()!

      if (visited[x][y])
      {
        continue
      }

      visited[x][y] = true

      if (x === this.endPosition[0] && y === this.endPosition[1])
      {
        break
      }

      for (const [dx, dy] of Directions)
      {
        const nx = x + dx
        const ny = y + dy

        const isValid =
          nx >= 0 && ny >= 0 && nx < this.rows && ny < this.cols &&
          this.board[nx][ny] !== BoardElements.Obstacle && !visited[nx][ny]

        if (isValid)
        {
          const newDistance = distances[x][y] + 1

          if (newDistance < distances[nx][ny])
          {
            distances[nx][ny] = newDistance
            queue.push([nx, ny])
          }
        }
      }
    }

    const path = this.reconstructPath(distances)

    for (const [px, py] of path)
    {
      const isNotStart = px !== this.startPosition[0] || py !== this.startPosition[1]
      const isNotEnd = px !== this.endPosition[0] || py !== this.endPosition[1]

      if (isNotEnd && isNotStart)
      {
        this.board[px][py] = BoardElements.Path
      }
    }

    return this.board
  }
}
