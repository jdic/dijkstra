// src/constants/global.ts
var BoardElements;
((BoardElements2) => {
  BoardElements2["Empty"] = "⬜";
  BoardElements2["Obstacle"] = "⬛";
  BoardElements2["Start"] = "\uD83D\uDFE9";
  BoardElements2["End"] = "\uD83D\uDFE5";
  BoardElements2["Path"] = "\uD83D\uDFE6";
})(BoardElements ||= {});
var Directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

// src/algorithms/Dijkstra.ts
class Dijkstra {
  board;
  startPosition;
  endPosition;
  rows;
  cols;
  constructor(board) {
    this.board = board;
    this.rows = board.length;
    this.cols = board[0].length;
    this.startPosition = this.findElementPosition("\uD83D\uDFE9" /* Start */);
    this.endPosition = this.findElementPosition("\uD83D\uDFE5" /* End */);
  }
  findElementPosition(element) {
    for (let row = 0;row < this.rows; row++) {
      for (let col = 0;col < this.cols; col++) {
        if (this.board[row][col] === element) {
          return [row, col];
        }
      }
    }
    throw new Error(`Element ${element} not found`);
  }
  create2DArray(defaultValue) {
    return Array.from({ length: this.rows }, () => {
      return Array(this.cols).fill(defaultValue);
    });
  }
  reconstructPath(distances) {
    const path = [];
    let [x, y] = this.endPosition;
    if (distances[x][y] === Infinity) {
      return path;
    }
    while (x !== this.startPosition[0] || y !== this.startPosition[1]) {
      path.push([x, y]);
      for (const [dx, dy] of Directions) {
        const nx = x + dx;
        const ny = y + dy;
        const isValid = nx >= 0 && ny >= 0 && nx < this.rows && ny < this.cols && distances[nx][ny] === distances[x][y] - 1;
        if (isValid) {
          x = nx;
          y = ny;
          break;
        }
      }
    }
    path.push(this.startPosition);
    return path.reverse();
  }
  solve() {
    const distances = this.create2DArray(Infinity);
    const visited = this.create2DArray(false);
    const queue = [this.startPosition];
    distances[this.startPosition[0]][this.startPosition[1]] = 0;
    while (queue.length > 0) {
      queue.sort((a, b) => distances[a[0]][a[1]] - distances[b[0]][b[1]]);
      const [x, y] = queue.shift();
      if (visited[x][y]) {
        continue;
      }
      visited[x][y] = true;
      if (x === this.endPosition[0] && y === this.endPosition[1]) {
        break;
      }
      for (const [dx, dy] of Directions) {
        const nx = x + dx;
        const ny = y + dy;
        const isValid = nx >= 0 && ny >= 0 && nx < this.rows && ny < this.cols && this.board[nx][ny] !== "⬛" /* Obstacle */ && !visited[nx][ny];
        if (isValid) {
          const newDistance = distances[x][y] + 1;
          if (newDistance < distances[nx][ny]) {
            distances[nx][ny] = newDistance;
            queue.push([nx, ny]);
          }
        }
      }
    }
    const path = this.reconstructPath(distances);
    for (const [px, py] of path) {
      const isNotStart = px !== this.startPosition[0] || py !== this.startPosition[1];
      const isNotEnd = px !== this.endPosition[0] || py !== this.endPosition[1];
      if (isNotEnd && isNotStart) {
        this.board[px][py] = "\uD83D\uDFE6" /* Path */;
      }
    }
    return this.board;
  }
}

// src/core/BoardManager.ts
class BoardManager {
  board;
  constructor(board) {
    this.board = board;
  }
  display() {
    console.log(this.board.map((row) => row.join("")).join(`
`));
  }
  solve() {
    const dijkstra = new Dijkstra(this.board);
    return dijkstra.solve();
  }
  setElement(position, element) {
    const [x, y] = position;
    this.board[x][y] = element;
  }
  getBoard() {
    return this.board;
  }
}
export {
  Directions,
  Dijkstra,
  BoardManager,
  BoardElements
};

//# debugId=4A336431CAFF2ECC64756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbnN0YW50cy9nbG9iYWwudHMiLCAiLi4vc3JjL2FsZ29yaXRobXMvRGlqa3N0cmEudHMiLCAiLi4vc3JjL2NvcmUvQm9hcmRNYW5hZ2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWwogICAgImV4cG9ydCBlbnVtIEJvYXJkRWxlbWVudHNcbntcbiAgRW1wdHkgPSAn4qycJyxcbiAgT2JzdGFjbGUgPSAn4qybJyxcbiAgU3RhcnQgPSAn8J+fqScsXG4gIEVuZCA9ICfwn5+lJyxcbiAgUGF0aCA9ICfwn5+mJyxcbn1cblxuZXhwb3J0IGNvbnN0IERpcmVjdGlvbnM6IFtudW1iZXIsIG51bWJlcl1bXSA9XG5bXG4gIFswLCAxXSxcbiAgWzEsIDBdLFxuICBbMCwgLTFdLFxuICBbLTEsIDBdLFxuXVxuIiwKICAgICJpbXBvcnQgeyBCb2FyZEVsZW1lbnRzLCBEaXJlY3Rpb25zIH0gZnJvbSAnQC9jb25zdGFudHMvZ2xvYmFsJ1xuaW1wb3J0IHR5cGUgeyBCb2FyZCwgUG9zaXRpb24gfSBmcm9tICdAL3R5cGVzL2dsb2JhbCdcblxuZXhwb3J0IGNsYXNzIERpamtzdHJhXG57XG4gIHByaXZhdGUgYm9hcmQ6IEJvYXJkXG4gIHByaXZhdGUgc3RhcnRQb3NpdGlvbjogUG9zaXRpb25cbiAgcHJpdmF0ZSBlbmRQb3NpdGlvbjogUG9zaXRpb25cbiAgcHJpdmF0ZSByb3dzOiBudW1iZXJcbiAgcHJpdmF0ZSBjb2xzOiBudW1iZXJcblxuICBjb25zdHJ1Y3Rvcihib2FyZDogQm9hcmQpXG4gIHtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmRcbiAgICB0aGlzLnJvd3MgPSBib2FyZC5sZW5ndGhcbiAgICB0aGlzLmNvbHMgPSBib2FyZFswXS5sZW5ndGhcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSB0aGlzLmZpbmRFbGVtZW50UG9zaXRpb24oQm9hcmRFbGVtZW50cy5TdGFydClcbiAgICB0aGlzLmVuZFBvc2l0aW9uID0gdGhpcy5maW5kRWxlbWVudFBvc2l0aW9uKEJvYXJkRWxlbWVudHMuRW5kKVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kRWxlbWVudFBvc2l0aW9uKGVsZW1lbnQ6IEJvYXJkRWxlbWVudHMpOiBQb3NpdGlvblxuICB7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5yb3dzOyByb3crKylcbiAgICB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHM7IGNvbCsrKVxuICAgICAge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IGVsZW1lbnQpXG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gW3JvdywgY29sXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50ICR7ZWxlbWVudH0gbm90IGZvdW5kYClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlMkRBcnJheTxUPihkZWZhdWx0VmFsdWU6IFQpOiBUW11bXVxuICB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoKSA9PlxuICAgIHtcbiAgICAgIHJldHVybiBBcnJheSh0aGlzLmNvbHMpLmZpbGwoZGVmYXVsdFZhbHVlKVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIHJlY29uc3RydWN0UGF0aChkaXN0YW5jZXM6IG51bWJlcltdW10pOiBQb3NpdGlvbltdXG4gIHtcbiAgICBjb25zdCBwYXRoOiBQb3NpdGlvbltdID0gW11cbiAgICBsZXQgW3gsIHldID0gdGhpcy5lbmRQb3NpdGlvblxuXG4gICAgaWYgKGRpc3RhbmNlc1t4XVt5XSA9PT0gSW5maW5pdHkpXG4gICAge1xuICAgICAgcmV0dXJuIHBhdGhcbiAgICB9XG5cbiAgICB3aGlsZSAoeCAhPT0gdGhpcy5zdGFydFBvc2l0aW9uWzBdIHx8IHkgIT09IHRoaXMuc3RhcnRQb3NpdGlvblsxXSlcbiAgICB7XG4gICAgICBwYXRoLnB1c2goW3gsIHldKVxuXG4gICAgICBmb3IgKGNvbnN0IFtkeCwgZHldIG9mIERpcmVjdGlvbnMpXG4gICAgICB7XG4gICAgICAgIGNvbnN0IG54ID0geCArIGR4XG4gICAgICAgIGNvbnN0IG55ID0geSArIGR5XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9XG4gICAgICAgICAgbnggPj0gMCAmJiBueSA+PSAwICYmIG54IDwgdGhpcy5yb3dzICYmIG55IDwgdGhpcy5jb2xzICYmXG4gICAgICAgICAgZGlzdGFuY2VzW254XVtueV0gPT09IGRpc3RhbmNlc1t4XVt5XSAtIDFcblxuICAgICAgICBpZiAoaXNWYWxpZClcbiAgICAgICAge1xuICAgICAgICAgIHggPSBueFxuICAgICAgICAgIHkgPSBueVxuXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHBhdGgucHVzaCh0aGlzLnN0YXJ0UG9zaXRpb24pXG5cbiAgICByZXR1cm4gcGF0aC5yZXZlcnNlKClcbiAgfVxuXG4gIHNvbHZlKCk6IEJvYXJkXG4gIHtcbiAgICBjb25zdCBkaXN0YW5jZXMgPSB0aGlzLmNyZWF0ZTJEQXJyYXkoSW5maW5pdHkpXG4gICAgY29uc3QgdmlzaXRlZCA9IHRoaXMuY3JlYXRlMkRBcnJheShmYWxzZSlcbiAgICBjb25zdCBxdWV1ZTogUG9zaXRpb25bXSA9IFt0aGlzLnN0YXJ0UG9zaXRpb25dXG5cbiAgICBkaXN0YW5jZXNbdGhpcy5zdGFydFBvc2l0aW9uWzBdXVt0aGlzLnN0YXJ0UG9zaXRpb25bMV1dID0gMFxuXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApXG4gICAge1xuICAgICAgcXVldWUuc29ydCgoYSwgYikgPT4gZGlzdGFuY2VzW2FbMF1dW2FbMV1dIC0gZGlzdGFuY2VzW2JbMF1dW2JbMV1dKVxuXG4gICAgICBjb25zdCBbeCwgeV0gPSBxdWV1ZS5zaGlmdCgpIVxuXG4gICAgICBpZiAodmlzaXRlZFt4XVt5XSlcbiAgICAgIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgdmlzaXRlZFt4XVt5XSA9IHRydWVcblxuICAgICAgaWYgKHggPT09IHRoaXMuZW5kUG9zaXRpb25bMF0gJiYgeSA9PT0gdGhpcy5lbmRQb3NpdGlvblsxXSlcbiAgICAgIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBbZHgsIGR5XSBvZiBEaXJlY3Rpb25zKVxuICAgICAge1xuICAgICAgICBjb25zdCBueCA9IHggKyBkeFxuICAgICAgICBjb25zdCBueSA9IHkgKyBkeVxuXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPVxuICAgICAgICAgIG54ID49IDAgJiYgbnkgPj0gMCAmJiBueCA8IHRoaXMucm93cyAmJiBueSA8IHRoaXMuY29scyAmJlxuICAgICAgICAgIHRoaXMuYm9hcmRbbnhdW255XSAhPT0gQm9hcmRFbGVtZW50cy5PYnN0YWNsZSAmJiAhdmlzaXRlZFtueF1bbnldXG5cbiAgICAgICAgaWYgKGlzVmFsaWQpXG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBuZXdEaXN0YW5jZSA9IGRpc3RhbmNlc1t4XVt5XSArIDFcblxuICAgICAgICAgIGlmIChuZXdEaXN0YW5jZSA8IGRpc3RhbmNlc1tueF1bbnldKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRpc3RhbmNlc1tueF1bbnldID0gbmV3RGlzdGFuY2VcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goW254LCBueV0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcGF0aCA9IHRoaXMucmVjb25zdHJ1Y3RQYXRoKGRpc3RhbmNlcylcblxuICAgIGZvciAoY29uc3QgW3B4LCBweV0gb2YgcGF0aClcbiAgICB7XG4gICAgICBjb25zdCBpc05vdFN0YXJ0ID0gcHggIT09IHRoaXMuc3RhcnRQb3NpdGlvblswXSB8fCBweSAhPT0gdGhpcy5zdGFydFBvc2l0aW9uWzFdXG4gICAgICBjb25zdCBpc05vdEVuZCA9IHB4ICE9PSB0aGlzLmVuZFBvc2l0aW9uWzBdIHx8IHB5ICE9PSB0aGlzLmVuZFBvc2l0aW9uWzFdXG5cbiAgICAgIGlmIChpc05vdEVuZCAmJiBpc05vdFN0YXJ0KVxuICAgICAge1xuICAgICAgICB0aGlzLmJvYXJkW3B4XVtweV0gPSBCb2FyZEVsZW1lbnRzLlBhdGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5ib2FyZFxuICB9XG59XG4iLAogICAgImltcG9ydCB0eXBlIHsgQm9hcmQsIFBvc2l0aW9uIH0gZnJvbSAnQC90eXBlcy9nbG9iYWwnXG5pbXBvcnQgeyBCb2FyZEVsZW1lbnRzIH0gZnJvbSAnQC9jb25zdGFudHMvZ2xvYmFsJ1xuaW1wb3J0IHsgRGlqa3N0cmEgfSBmcm9tICdAL2FsZ29yaXRobXMvRGlqa3N0cmEnXG5cbmV4cG9ydCBjbGFzcyBCb2FyZE1hbmFnZXJcbntcbiAgcHJpdmF0ZSBib2FyZDogQm9hcmRcblxuICBjb25zdHJ1Y3Rvcihib2FyZDogQm9hcmQpXG4gIHtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmRcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZFxuICB7XG4gICAgY29uc29sZS5sb2codGhpcy5ib2FyZC5tYXAoKHJvdykgPT4gcm93LmpvaW4oJycpKS5qb2luKCdcXG4nKSlcbiAgfVxuXG4gIHNvbHZlKCk6IEJvYXJkXG4gIHtcbiAgICBjb25zdCBkaWprc3RyYSA9IG5ldyBEaWprc3RyYSh0aGlzLmJvYXJkKVxuXG4gICAgcmV0dXJuIGRpamtzdHJhLnNvbHZlKClcbiAgfVxuXG4gIHNldEVsZW1lbnQocG9zaXRpb246IFBvc2l0aW9uLCBlbGVtZW50OiBCb2FyZEVsZW1lbnRzKTogdm9pZFxuICB7XG4gICAgY29uc3QgW3gsIHldID0gcG9zaXRpb25cblxuICAgIHRoaXMuYm9hcmRbeF1beV0gPSBlbGVtZW50XG4gIH1cblxuICBnZXRCb2FyZCgpOiBCb2FyZFxuICB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRcbiAgfVxufVxuIgogIF0sCiAgIm1hcHBpbmdz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
