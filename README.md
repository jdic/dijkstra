# Dijkstra

**Dijkstra's Algorithm** is a shortest path search algorithm in a weighted graph. It is used to find the shortest path from a starting node to all other nodes in a network, considering the costs (or weights) of the edges.

## Example

```ts
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
```

```sh
Initial board:
🟩⬜⬜⬜⬜
⬜⬛⬛⬜⬛
⬜⬛🟥⬜⬜
⬜⬛⬜⬛⬜
⬜⬜⬜⬛⬛

Solved board:
🟩🟦🟦🟦⬜
⬜⬛⬛🟦⬛
⬜⬛🟥🟦⬜
⬜⬛⬜⬛⬜
⬜⬜⬜⬛⬛
```

## Built with

[![TypeScript](https://skillicons.dev/icons?i=ts)](https://www.typescriptlang.org/)
[![Bun](https://skillicons.dev/icons?i=bun)](https://bun.sh/)
[![Jest](https://skillicons.dev/icons?i=jest)](https://jestjs.io/)
