const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

export function getGrid() {
    return grid;
}

let score = 0, bestScore = localStorage.getItem('bestScore') || 0;

// ـــــــــــــــــــــــــــــــــــــــــــــــ test cases ـــــــــــــــــــــــــــــــــــــــــــــــ
const testCases = [
    [0, 0, 0, 0],   // #1
    [0, 2, 0, 0],   // #2
    [2, 2, 0, 0],   // #3
    [2, 0, 0, 2],   // #4
    [2, 4, 8, 0],   // #5
    [2, 2, 2, 0],   // #6
    [0, 2, 2, 2],   // #7
    [2, 0, 2, 2],   // #8
    [2, 2, 2, 2],   // #9
    [2, 2, 4, 4],   // #10
    [4, 2, 2, 4],   // #11
    [2, 2, 4, 2],   // #12
    [2, 4, 2, 2],   // #13
    [2, 4, 8, 16]   // #14
]

const expectedLeft = [
    [0, 0, 0, 0],   // #1
    [2, 0, 0, 0],   // #2
    [4, 0, 0, 0],   // #3
    [4, 0, 0, 0],   // #4
    [2, 4, 8, 0],   // #5
    [4, 2, 0, 0],   // #6
    [4, 2, 0, 0],   // #7
    [4, 2, 0, 0],   // #8
    [4, 4, 0, 0],   // #9
    [4, 8, 0, 0],   // #10
    [4, 4, 4, 0],   // #11
    [4, 4, 2, 0],   // #12
    [2, 4, 4, 0],   // #13
    [2, 4, 8, 16]   // #14
];

const expectedRight = [
    [0, 0, 0, 0],   // #1
    [0, 0, 0, 2],   // #2
    [0, 0, 0, 4],   // #3
    [0, 0, 0, 4],   // #4
    [0, 2, 4, 8],   // #5
    [0, 0, 2, 4],   // #6
    [0, 0, 2, 4],   // #7
    [0, 0, 2, 4],   // #8
    [0, 0, 4, 4],   // #9
    [0, 0, 4, 8],   // #10
    [0, 4, 4, 4],   // #11
    [0, 4, 4, 2],   // #12
    [0, 2, 4, 4],   // #13
    [2, 4, 8, 16]   // #14
];

function unitTest(callback, expected, mode) {
    for (let i = 0; i < testCases.length; ++i) {
        const expectedArr = expected[i];
        const callbackArr = callback([...testCases[i]], true);

        if (JSON.stringify(callbackArr) != JSON.stringify(expectedArr)) {
            console.log(`\t\t Test #${i + 1} ${ mode } Fail`);
            console.log('test    ', testCases[i]);
            console.log('expected', expectedArr);
            console.log('callback', callbackArr);
            console.log('\n');
        }
    }
}

// ـــــــــــــــــــــــــــــــــــــــــــــــ end move or game ـــــــــــــــــــــــــــــــــــــــــــــــ
function setRandomCell() {
    const emptyCells = [];

    for (let r = 0; r < 4; ++r) {
        for (let c = 0; c < 4; ++c) {
            if (grid[r][c] === 0) {
                emptyCells.push({ row: r, col: c });
            }
        }
    }

    if (emptyCells.length === 0) {
        endGame();
        return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;

    return grid[row][col];
} setRandomCell(); setRandomCell();

export function endGame() {            // used by user (reset game)
    grid.forEach(row => row.fill(0));
    updateScoreBoard(0);
    localStorage.setItem('bestScore', bestScore)
}

// ـــــــــــــــــــــــــــــــــــــــــــــــ update score ـــــــــــــــــــــــــــــــــــــــــــــــ
function updateScoreBoard(bouns) {
    score += bouns;
    if (score > bestScore)
        bestScore = score;
}

// ـــــــــــــــــــــــــــــــــــــــــــــــ move directions ـــــــــــــــــــــــــــــــــــــــــــــــ
function moveArrowRight(row, isTest = false) {    
    row = row.filter(v => v !== 0);
    
    for (let i = row.length - 1; i >= 0; --i) {
        if (row[i] === row[i - 1]) {
            row[i] += row[i - 1];
            row[i - 1] = 0;
            if (!isTest) updateScoreBoard(row[i]);
            // console.log('Right', row);
        }
    }
    
    row = row.filter(v => v !== 0);
    while (4 - row.length) {
        row.unshift(0);
    }

    return row;
}
unitTest(moveArrowRight, expectedRight, 'Right');

function moveArrowLeft(row, isTest = false) {
    row = row.filter(v => v !== 0);
    
    for (let i = 0; i < row.length - 1; ++i) {
        if (row[i] === row[i + 1]) {
            row[i] += row[i + 1];
            row[i + 1] = 0;
            if (!isTest) updateScoreBoard(row[i]);            // console.log('Left', row);
        }
    }

    row = row.filter(v => v !== 0);
    while (4 - row.length) {
        row.push(0);
    }
    return row;
}
unitTest(moveArrowLeft, expectedLeft, 'Left');

export function moveLeftAll() {       // used by user (arrow left)
    for (let row = 0; row < 4; ++row) {
        grid[row] = moveArrowLeft(grid[row]);
    }

    setRandomCell();
}

export function moveRightAll() {       // used by user (arrow right)
    for (let row = 0; row < 4; ++row) {
        grid[row] = moveArrowRight(grid[row]);
    }

    setRandomCell();
}

export function moveUpAll() {       // used by user (arrow up)
    for (let col = 0; col < 4; ++col) {
        let oneCol = []
        for (let row = 0; row < 4; ++row) {
            oneCol.push(grid[row][col]);
        }

        const movedCol = moveArrowLeft(oneCol);

        for (let row = 0; row < 4; ++row) {
            grid[row][col] = movedCol[row];
        }
    }

    setRandomCell();
}

export function moveDownAll() {       // used by user (arrow down)
    for (let col = 0; col < 4; ++col) {
        let oneCol = []
        for (let row = 0; row < 4; ++row) {
            oneCol.push(grid[row][col]);
        }

        const movedCol = moveArrowRight(oneCol);

        for (let row = 0; row < 4; ++row) {
            grid[row][col] = movedCol[row];
        }
    }

    setRandomCell();
}
export function getScore() { 
    return score; 
}
export function getBestScore() {
    return bestScore; 
}
function saveGame(){
    return localStorage.setItem("grid" , JSON.stringify(gridFromGame)); 
}

// console.log('Score: ', score, ' Best: ', bestScore);
// console.table(grid);
// moveUpAll();

// console.log('Score: ', score, ' Best: ', bestScore);
// console.table(grid);
// moveRightAll();

// console.log('Score: ', score, ' Best: ', bestScore);
// console.table(grid);
// moveDownAll();

// console.log('Score: ', score, ' Best: ', bestScore);
// console.table(grid);
// moveLeftAll();

// console.log('Score: ', score, ' Best: ', bestScore);
// console.table(grid);

/*
    [2, 2, 2, 0]
    left:   [4, 2, 0, 0] ✔✔
    Right:  [0, 0, 2, 4] ✔✔
*/