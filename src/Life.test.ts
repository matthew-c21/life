import { _private, createLife, advance } from './Life'

function generateNeighbors(n: number, center = false): boolean[][] {
  let arr = Array(3).fill(null).map(() => Array(3).fill(false));

  arr[1][1] = center;

  for (let i = 0; i < n; ++i) {
    if (i === 4) n++
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
    const rows = Math.floor(Math.random() * 10) + 1;
    const cols = Math.floor(Math.random() * 10) + 1;

    const life = createLife(rows, cols);

    expect(life.length).toBe(rows);

    for (const row of life) {
      expect(row.length).toBe(cols);

      for (const cell of row) {
        expect(cell).toBeFalsy();
      }
    }
  }
})

test('Count neighbors wraps vertically', () => {
  const grid = [
    [false, true, false],
    [false, false, false],
    [false, true, false],
  ]

  expect(_private.countLivingNeighbors(grid, 0, 1)).toBe(1);
  expect(_private.countLivingNeighbors(grid, 2, 1)).toBe(1);
});

test('Count neighbors wraps vertically without duplication', () => {
  const grid = [
    [false, true, true],
    [true, false, false],
    [true, true, true],
  ];

  expect(_private.countLivingNeighbors(grid, 0, 1)).toBe(6);
  expect(_private.countLivingNeighbors(grid, 2, 1)).toBe(6);
});


test('Count neighbors wraps horizontally', () => {
  const grid = [
    [false, false, false],
    [true, false, true],
    [false, false, false],
  ];

  expect(_private.countLivingNeighbors(grid, 1, 0)).toBe(1);
  expect(_private.countLivingNeighbors(grid, 1, 2)).toBe(1);
});

test('Count neighbors wraps horizontally without duplication', () => {
  const grid = [
    [false, false, true],
    [true, false, true],
    [true, false, false],
  ];

  expect(_private.countLivingNeighbors(grid, 1, 0)).toBe(4);
  expect(_private.countLivingNeighbors(grid, 1, 2)).toBe(4);
});

test('0 neighbors', () => {
  const grid = generateNeighbors(0);

  expect(_private.countLivingNeighbors(grid, 1, 1)).toBe(0);
})

test('Cannot count neighbors of out of bounds cell.', () => {
  for (let i = 0; i < 3; ++i) {
    expect(_private.countLivingNeighbors(generateNeighbors(0), 4, i)).toBeNull();
    expect(_private.countLivingNeighbors(generateNeighbors(0), i, 4)).toBeNull();
  }
})

test('Cell dies of lonliness', () => {
  for (let i = 0; i < 2; ++i) {
    expect(_private.willBeAlive(generateNeighbors(i, true), 1, 1)).toBeFalsy();
    expect(_private.willBeAlive(generateNeighbors(i, false), 1, 1)).toBeFalsy();
  }
});

test('Cell without too many neighbors survives', () => {
  for (let i = 2; i < 4; ++i) {
    expect(_private.willBeAlive(generateNeighbors(i, true), 1, 1)).toBeTruthy();
    expect(_private.willBeAlive(generateNeighbors(i, false), 1, 1)).toBeFalsy();
  }
});

test('Cell resurrection', () => {
  const grid = generateNeighbors(3, false);

  expect(_private.willBeAlive(grid, 1, 1)).toBeTruthy();
});

test('Cell dies from overpopulation', () => {
  for (let i = 4; i < 9; ++i) {
    expect(_private.willBeAlive(generateNeighbors(i, true), 1, 1)).toBeFalsy();
    expect(_private.willBeAlive(generateNeighbors(i, false), 1, 1)).toBeFalsy();
  }
});

// Note(matthew-c21): Test examples for the next three tests are all stolen from Wikipedia.
test('Static structure remains the same', () => {
  const constantStructures = [
    [ // Block
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
    [ // Beehive
      [false, false, false, false, false, false],
      [false, false, true, true, false, false],
      [false, true, false, false, true, false],
      [false, true, false, false, true, false],
      [false, false, true, true, false, false],
      [false, false, false, false, false, false],
    ],
    [ // Loaf
      [false, false, false, false, false, false],
      [false, false, true, true, false, false],
      [false, true, false, false, true, false],
      [false, false, true, false, true, false],
      [false, false, false, true, false, false],
      [false, false, false, false, false, false],
    ],
    [ // Boat
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, true, false, true, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    [ // Tub
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, true, false, true, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ]
  ];

  for (const structure of constantStructures) {
    expect(advance(structure)).toEqual(structure);
  }
})

test('Oscillating structures oscillate', () => {
  const oscillators = [
    [ // Blinker
      [ // Frame 1
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ],
      [ // Frame 2
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ]
    ],
    [ // Toad
      [ // Frame 1
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, true, true, true, false],
        [false, true, true, true, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ],
      [ // Frame 2
        [false, false, false, false, false, false],
        [false, false, false, true, false, false],
        [false, true, false, false, true, false],
        [false, true, false, false, true, false],
        [false, false, true, false, false, false],
        [false, false, false, false, false, false],
      ]
    ],
    [ // Beacon
      [ // Frame 1
        [false, false, false, false, false, false],
        [false, true, true, false, false, false],
        [false, true, true, false, false, false],
        [false, false, false, true, true, false],
        [false, false, false, true, true, false],
        [false, false, false, false, false, false],
      ],
      [ // Frame 2
        [false, false, false, false, false, false],
        [false, true, true, false, false, false],
        [false, true, false, false, false, false],
        [false, false, false, false, true, false],
        [false, false, false, true, true, false],
        [false, false, false, false, false, false],
      ]
    ],

  ];

  for (const oscillator of oscillators) {
    for (let i = 0; i < oscillator.length; ++i) {
      const frame = oscillator[i];
      const next = oscillator[(i + 1) % oscillator.length];

      expect(advance(frame)).toEqual(next);
    }
  }
})

test('Ensure glider behaves properly', () => {
  const gliderAnimation = [
    [ // Frame 1
      [false, false, false, false, false, false],
      [false, true, false, true, false, false],
      [false, false, true, true, false, false],
      [false, false, true, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ],
    [ // Frame 2
      [false, false, false, false, false, false],
      [false, false, false, true, false, false],
      [false, true, false, true, false, false],
      [false, false, true, true, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ],
    [ // Frame 3
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, true, false, false, false],
      [false, false, false, true, true, false],
      [false, false, true, true, false, false],
      [false, false, false, false, false, false],
    ],
    [ // Frame 4
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, true, false, false],
      [false, false, false, false, true, false],
      [false, false, true, true, true, false],
      [false, false, false, false, false, false],
    ],
  ];

  for (let i = 0; i < gliderAnimation.length - 1; ++i) {
    const frame = gliderAnimation[i];
    const next = gliderAnimation[i + 1];

    expect(advance(frame)).toEqual(next);
  }
})

export { };
