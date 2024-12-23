import { Dijkstra } from '@/algorithms/Dijkstra'
import type { Board } from '@/types/global'

describe('Dijkstra Algorithm', () =>
{
  it('should find the shortest path', () =>
  {
    const board: Board =
    [
      ['🟩', '⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬛', '⬛', '⬜', '⬛'],
      ['⬜', '⬛', '🟥', '⬜', '⬜'],
      ['⬜', '⬛', '⬜', '⬛', '⬜'],
      ['⬜', '⬜', '⬜', '⬛', '⬛'],
    ]

    const dijkstra = new Dijkstra(board)
    const solved = dijkstra.solve()

    const solvedBoard: Board =
    [
      ['🟩', '🟦', '🟦', '🟦', '⬜'],
      ['⬜', '⬛', '⬛', '🟦', '⬛'],
      ['⬜', '⬛', '🟥', '🟦', '⬜'],
      ['⬜', '⬛', '⬜', '⬛', '⬜'],
      ['⬜', '⬜', '⬜', '⬛', '⬛'],
    ]

    expect(solved).toEqual(solvedBoard)
  })

  it('should return the same board if there is no path', () =>
  {
    const board: Board =
    [
      ['🟩', '⬜', '⬜', '⬜', '⬜'],
      ['⬜', '⬛', '⬛', '⬛', '⬛'],
      ['⬜', '⬛', '🟥', '⬜', '⬜'],
      ['⬜', '⬛', '⬛', '⬛', '⬜'],
      ['⬜', '⬜', '⬜', '⬛', '⬛'],
    ]

    const dijkstra = new Dijkstra(board)
    const solved = dijkstra.solve()

    expect(solved).toEqual(board)
  })
})
