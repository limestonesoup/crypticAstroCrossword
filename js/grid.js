/**
 * GRID DEFINITION
 *
 * The 11×11 grid with solution letters, black cells, bars, and clue numbers.
 */

const GRID_SIZE = 11;

// Solution grid: '#' = black cell, letter = white cell
const SOLUTION = [
    ['A','P','O','P','H','I','S','A','X','I','S'],  // row 0
    ['S','#','R','#','A','#','#','L','#','S','#'],  // row 1
    ['T','#','I','#','L','#','#','B','#','S','#'],  // row 2
    ['E','X','O','P','L','A','N','E','T','#','R'],  // row 3
    ['R','#','N','#','E','#','#','D','#','#','E'],  // row 4
    ['O','#','#','T','Y','C','H','O','#','#','D'],  // row 5
    ['I','#','#','H','#','#','E','#','T','#','D'],  // row 6
    ['D','#','S','A','T','E','L','L','I','T','E'],  // row 7
    ['#','E','#','L','#','#','I','#','T','#','N'],  // row 8
    ['#','T','#','E','#','#','U','#','A','#','E'],  // row 9
    ['M','A','R','S','G','E','M','I','N','I','D'],  // row 10
];

// Bars: cells that have a thick bar on a specific side
// Format: { row, col, side: 'right' | 'left' }
const BARS = [
    { row: 0, col: 6, side: 'right' },   // After APOPHIS, before AXIS
    { row: 0, col: 7, side: 'left' },
    { row: 10, col: 3, side: 'right' },  // After MARS, before GEMINID
    { row: 10, col: 4, side: 'left' },
];

// Clue numbers and their positions
// Each entry: { number, row, col }
const CLUE_NUMBERS = [
    { number: 1,  row: 0,  col: 0 },
    { number: 2,  row: 0,  col: 2 },
    { number: 3,  row: 0,  col: 4 },
    { number: 4,  row: 0,  col: 7 },
    { number: 5,  row: 0,  col: 9 },
    { number: 6,  row: 3,  col: 0 },
    { number: 7,  row: 3,  col: 10 },
    { number: 8,  row: 5,  col: 3 },
    { number: 9,  row: 5,  col: 6 },
    { number: 10, row: 6,  col: 8 },
    { number: 11, row: 7,  col: 2 },
    { number: 12, row: 8,  col: 1 },
    { number: 13, row: 10, col: 0 },
    { number: 14, row: 10, col: 4 },
];

/**
 * CLUE CELL RANGES
 * Maps each clue ID (e.g. "1A") to its list of cells [{row, col}, ...]
 */
const CLUE_CELLS = {
    // Across
    "1A":  [{row:0,col:0},{row:0,col:1},{row:0,col:2},{row:0,col:3},{row:0,col:4},{row:0,col:5},{row:0,col:6}],
    "4A":  [{row:0,col:7},{row:0,col:8},{row:0,col:9},{row:0,col:10}],
    "6A":  [{row:3,col:0},{row:3,col:1},{row:3,col:2},{row:3,col:3},{row:3,col:4},{row:3,col:5},{row:3,col:6},{row:3,col:7},{row:3,col:8}],
    "8A":  [{row:5,col:3},{row:5,col:4},{row:5,col:5},{row:5,col:6},{row:5,col:7}],
    "11A": [{row:7,col:2},{row:7,col:3},{row:7,col:4},{row:7,col:5},{row:7,col:6},{row:7,col:7},{row:7,col:8},{row:7,col:9},{row:7,col:10}],
    "13A": [{row:10,col:0},{row:10,col:1},{row:10,col:2},{row:10,col:3}],
    "14A": [{row:10,col:4},{row:10,col:5},{row:10,col:6},{row:10,col:7},{row:10,col:8},{row:10,col:9},{row:10,col:10}],

    // Down
    "1D":  [{row:0,col:0},{row:1,col:0},{row:2,col:0},{row:3,col:0},{row:4,col:0},{row:5,col:0},{row:6,col:0},{row:7,col:0}],
    "2D":  [{row:0,col:2},{row:1,col:2},{row:2,col:2},{row:3,col:2},{row:4,col:2}],
    "3D":  [{row:0,col:4},{row:1,col:4},{row:2,col:4},{row:3,col:4},{row:4,col:4},{row:5,col:4}],
    "4D":  [{row:0,col:7},{row:1,col:7},{row:2,col:7},{row:3,col:7},{row:4,col:7},{row:5,col:7}],
    "5D":  [{row:0,col:9},{row:1,col:9},{row:2,col:9}],
    "7D":  [{row:3,col:10},{row:4,col:10},{row:5,col:10},{row:6,col:10},{row:7,col:10},{row:8,col:10},{row:9,col:10},{row:10,col:10}],
    "8D":  [{row:5,col:3},{row:6,col:3},{row:7,col:3},{row:8,col:3},{row:9,col:3},{row:10,col:3}],
    "9D":  [{row:5,col:6},{row:6,col:6},{row:7,col:6},{row:8,col:6},{row:9,col:6},{row:10,col:6}],
    "10D": [{row:6,col:8},{row:7,col:8},{row:8,col:8},{row:9,col:8},{row:10,col:8}],
    "12D": [{row:8,col:1},{row:9,col:1},{row:10,col:1}],
};

/**
 * Build ordered lists of across and down clue IDs
 */
const ACROSS_CLUE_ORDER = ["1A","4A","6A","8A","11A","13A","14A"];
const DOWN_CLUE_ORDER = ["1D","2D","3D","4D","5D","7D","8D","9D","10D","12D"];