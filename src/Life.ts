type Life = boolean[][];

function createLife(rows: number, cols: number): Life {
  if (rows === 0) return [[]]
  return Array(rows).fill(null).map(() => Array(cols).fill(false));
}

/**
 * Get a count of the number of living neighbors assuming the grid wraps both horizontally and vertically.
 * @param life current life grid
 * @param row of the cell to be checked
 * @param col of the cell to be checked
 * @returns a non-negative count of living neighbors of the cell
 */
function countLivingNeighbors(life: Life, row: number, col: number): number | null {
  return 0;
}

function willBeAlive(life: Life, row: number, col: number): boolean | null {
  return false;
}

function advance(life: Life): Life {
  return life;
}

export {createLife, advance};

export const _private = {
  countLivingNeighbors,
  willBeAlive,
}