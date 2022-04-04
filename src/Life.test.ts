import {_private, createLife, advance} from './Life'

function generateNeighbors(n: number, center = false): boolean[][] {
  let arr = Array(3).fill(null).map(() => Array(3).fill(false));

  arr[1][1] = center;

  for (let i = 0; i < n; ++i) {
    if (i === 4) n ++
    else {
      arr[Math.floor(i / 3)][i % 3] = true;
    }
  }
  
  return arr;
}

test('Generate 0 neighbors', () => {
  expect(generateNeighbors(0, false)).toEqual([[false, false, false], [false, false, false], [false, false, false]]);
  expect(generateNeighbors(0, true)).toEqual([[false, false, false], [false, true, false], [false, false, false]]);
});

test('Generate 2 neighbors', () => {
  expect(generateNeighbors(2, false)).toEqual([[true, true, false], [false, false, false], [false, false, false]]);
  expect(generateNeighbors(2, true)).toEqual([[true, true, false], [false, true, false], [false, false, false]]);
});

test('Generate 5 neighbors', () => {
  expect(generateNeighbors(5, false)).toEqual([[true, true, true], [true, false, true], [false, false, false]]);
  expect(generateNeighbors(5, true)).toEqual([[true, true, true], [true, true, true], [false, false, false]]);
});

test('Generate n neighbors with default `false`', () => {
  const countNeighbors = (grid: boolean[][]) => grid.flat().reduce((count, cell) => cell ? count + 1 : count, 0);

  for (let i = 0; i < 8; ++i) {
    expect(countNeighbors(generateNeighbors(i, false))).toBe(i);
    expect(countNeighbors(generateNeighbors(i, true))).toBe(i + 1);
  }
})

test('Construct empty grid', () => {
  expect(createLife(0, 0)).toEqual([[]]);
})

test('Random construction', () => {
  for (let i = 0; i < 1000; ++i) {
    const width = Math.floor(Math.random() * 500);
    const height = Math.floor(Math.random() * 500);

    const life = createLife(width, height);

    expect(life.length).toBe(width);

    for (const row of life) {
      expect(row.length).toBe(height);

      for (const cell of row) {
        expect(cell).toBeFalsy();
      }
    }
  }
})

test('Count neighbors wraps vertically', () => {
  const grid = [
    [false, true,  false],
    [false, false, false],
    [false, true,  false],
  ]

  expect(_private.countLivingNeighbors(grid, 0, 1)).toBe(1);
  expect(_private.countLivingNeighbors(grid, 2, 1)).toBe(1);
});

test('Count neighbors wraps vertically without duplication', () => {
  const grid = [
    [false, true,  true ],
    [true,  false, false],
    [true,  true,  true ],
  ];

  expect(_private.countLivingNeighbors(grid, 0, 1)).toBe(6);
  expect(_private.countLivingNeighbors(grid, 2, 1)).toBe(6);
});


test('Count neighbors wraps horizontally', () => {
  const grid = [
    [false, false, false],
    [true , false, true ],
    [false, false, false],
  ];

  expect(_private.countLivingNeighbors(grid, 1, 0)).toBe(1);
  expect(_private.countLivingNeighbors(grid, 1, 2)).toBe(1);
});

test('Count neighbors wraps horizontally without duplication', () => {
  const grid = [
    [false, false, true ],
    [true , false, true ],
    [true , false, false],
  ];

  expect(_private.countLivingNeighbors(grid, 1, 0)).toBe(4);
  expect(_private.countLivingNeighbors(grid, 1, 2)).toBe(4);
});

test('0 neighbors', () => {})

export {};
