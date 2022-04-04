type Life = boolean[][];

function createLife(rows: number, cols: number): Life {
  return Array(rows).map(() => Array(cols).fill(false));
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

function advance(life: Life): Life {
  return life;
}

export {createLife, advance};

export const _private = {
  countLivingNeighbors
}