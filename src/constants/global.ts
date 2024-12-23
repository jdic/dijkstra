export enum BoardElements
{
  Empty = '⬜',
  Obstacle = '⬛',
  Start = '🟩',
  End = '🟥',
  Path = '🟦',
}

export const Directions: [number, number][] =
[
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]
