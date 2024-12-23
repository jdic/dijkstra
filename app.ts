import { BoardManager, type Board } from './src'

const board: Board =
[
  ['🟩', '⬜', '⬜', '⬜', '⬜'],
  ['⬜', '⬛', '⬛', '⬜', '⬛'],
  ['⬜', '⬛', '🟥', '⬜', '⬜'],
  ['⬜', '⬛', '⬜', '⬛', '⬜'],
  ['⬜', '⬜', '⬜', '⬛', '⬛'],
]

const manager = new BoardManager(board)

console.log('Initial board:')
manager.display()
console.log('\n')

manager.solve()
console.log('Solved board:')
manager.display()
