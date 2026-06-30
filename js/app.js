/**
 * MAIN APPLICATION
 *
 * Handles grid rendering, cell interaction, navigation, and toggle controls.
 */

// ===== STATE =====
let currentClueId = null;    // e.g. "1A"
let currentDirection = 'across'; // 'across' or 'down'
let currentRow = null;
let currentCol = null;
let cells = {};              // key: "row-col", value: DOM element

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    renderClues();
    setupToggles();
    selectClue("1A"); // Default selection

    // Global keyboard handler
    document.addEventListener('keydown', handleKeyDown);
});

// ===== GRID BUILDING =====
function buildGrid() {
    const gridEl = document.getElementById('crossword-grid');

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.dataset.row = r;
            cellDiv.dataset.col = c;

            const letter = SOLUTION[r][c];

            if (letter === '#') {
                cellDiv.classList.add('black');
            } else {
                // Input
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.row = r;
                input.dataset.col = c;
                input.setAttribute('autocomplete', 'off');
                input.setAttribute('autocorrect', 'off');
                input.setAttribute('autocapitalize', 'characters');
                input.setAttribute('spellcheck', 'false');

                input.addEventListener('input', (e) => handleInput(e, r, c));
                input.addEventListener('mousedown', (e) => handleCellClick(e, r, c));

                cellDiv.appendChild(input);
            }

            // Add clue number if applicable
            const clueNum = CLUE_NUMBERS.find(cn => cn.row === r && cn.col === c);
            if (clueNum) {
                const numLabel = document.createElement('span');
                numLabel.className = 'cell-number';
                numLabel.textContent = clueNum.number;
                cellDiv.appendChild(numLabel);
            }

            // Add bar classes
            BARS.forEach(bar => {
                if (bar.row === r && bar.col === c) {
                    if (bar.side === 'right') cellDiv.classList.add('bar-right');
                    if (bar.side === 'left') cellDiv.classList.add('bar-left');
                }
            });

            gridEl.appendChild(cellDiv);
            cells[`${r}-${c}`] = cellDiv;
        }
    }
}

// ===== CELL INTERACTION =====
function handleCellClick(e, row, col) {
    e.preventDefault();

    if (SOLUTION[row][col] === '#') return;

    // If clicking the same cell, toggle direction
    if (currentRow === row && currentCol === col) {
        toggleDirection(row, col);
    } else {
        // Move to this cell, keep current direction if possible
        // But pick the appropriate direction based on what clues this cell belongs to
        const clueId = findClueForCell(row, col, currentDirection);
        if (clueId) {
            currentRow = row;
            currentCol = col;
            currentClueId = clueId;
            currentDirection = clueId.endsWith('A') ? 'across' : 'down';
        } else {
            // Try the other direction
            const otherDir = currentDirection === 'across' ? 'down' : 'across';
            const otherId = findClueForCell(row, col, otherDir);
            if (otherId) {
                currentRow = row;
                currentCol = col;
                currentClueId = otherId;
                currentDirection = otherDir;
            }
        }
    }

    updateHighlighting();
    focusCell(currentRow, currentCol);
}

function toggleDirection(row, col) {
    const otherDir = currentDirection === 'across' ? 'down' : 'across';
    const otherId = findClueForCell(row, col, otherDir);
    if (otherId) {
        currentDirection = otherDir;
        currentClueId = otherId;
    }
    updateHighlighting();
}

// ===== INPUT HANDLING =====
function handleInput(e, row, col) {
    const input = e.target;
    let val = input.value;

    // Only allow letters
    val = val.replace(/[^a-zA-Z]/g, '');
    if (val.length > 1) val = val.charAt(val.length - 1);
    input.value = val.toUpperCase();

    if (val) {
        moveToNextCell();
    }
}

function handleKeyDown(e) {
    if (currentRow === null || currentCol === null) return;

    const key = e.key;

    switch (key) {
        case 'Tab':
            e.preventDefault();
            moveToNextClue(e.shiftKey);
            break;
        case 'ArrowRight':
            e.preventDefault();
            moveInDirection(0, 1);
            break;
        case 'ArrowLeft':
            e.preventDefault();
            moveInDirection(0, -1);
            break;
        case 'ArrowDown':
            e.preventDefault();
            moveInDirection(1, 0);
            break;
        case 'ArrowUp':
            e.preventDefault();
            moveInDirection(-1, 0);
            break;
        case 'Backspace':
            e.preventDefault();
            handleBackspace();
            break;
        case 'Delete':
            e.preventDefault();
            clearCurrentCell();
            break;
        case ' ':
            e.preventDefault();
            toggleDirection(currentRow, currentCol);
            focusCell(currentRow, currentCol);
            break;
    }
}

function handleBackspace() {
    const input = getCellInput(currentRow, currentCol);
    if (input && input.value) {
        input.value = '';
    } else {
        moveToPrevCell();
        const prevInput = getCellInput(currentRow, currentCol);
        if (prevInput) prevInput.value = '';
    }
}

function clearCurrentCell() {
    const input = getCellInput(currentRow, currentCol);
    if (input) input.value = '';
}

// ===== NAVIGATION =====
function moveToNextCell() {
    if (!currentClueId) return;
    const clueCells = CLUE_CELLS[currentClueId];
    if (!clueCells) return;

    const idx = clueCells.findIndex(c => c.row === currentRow && c.col === currentCol);
    if (idx < clueCells.length - 1) {
        const next = clueCells[idx + 1];
        currentRow = next.row;
        currentCol = next.col;
        updateHighlighting();
        focusCell(currentRow, currentCol);
    }
}

function moveToPrevCell() {
    if (!currentClueId) return;
    const clueCells = CLUE_CELLS[currentClueId];
    if (!clueCells) return;

    const idx = clueCells.findIndex(c => c.row === currentRow && c.col === currentCol);
    if (idx > 0) {
        const prev = clueCells[idx - 1];
        currentRow = prev.row;
        currentCol = prev.col;
        updateHighlighting();
        focusCell(currentRow, currentCol);
    }
}

function moveInDirection(dRow, dCol) {
    let newRow = currentRow + dRow;
    let newCol = currentCol + dCol;

    // Skip black cells
    while (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
        if (SOLUTION[newRow][newCol] !== '#') {
            currentRow = newRow;
            currentCol = newCol;

            // Update direction based on movement
            if (dRow !== 0 && dCol === 0) {
                currentDirection = 'down';
            } else if (dCol !== 0 && dRow === 0) {
                currentDirection = 'across';
            }

            const clueId = findClueForCell(currentRow, currentCol, currentDirection);
            if (clueId) {
                currentClueId = clueId;
            } else {
                const otherDir = currentDirection === 'across' ? 'down' : 'across';
                const otherId = findClueForCell(currentRow, currentCol, otherDir);
                if (otherId) {
                    currentClueId = otherId;
                    currentDirection = otherDir;
                }
            }

            updateHighlighting();
            focusCell(currentRow, currentCol);
            return;
        }
        newRow += dRow;
        newCol += dCol;
    }
}

function moveToNextClue(reverse) {
    if (!currentClueId) return;

    const isAcross = currentClueId.endsWith('A');
    const list = isAcross ? ACROSS_CLUE_ORDER : DOWN_CLUE_ORDER;
    const idx = list.indexOf(currentClueId);

    let nextIdx;
    if (reverse) {
        nextIdx = (idx - 1 + list.length) % list.length;
    } else {
        nextIdx = (idx + 1) % list.length;
    }

    selectClue(list[nextIdx]);
}

// ===== CLUE SELECTION =====
function selectClue(clueId) {
    currentClueId = clueId;
    currentDirection = clueId.endsWith('A') ? 'across' : 'down';

    const clueCells = CLUE_CELLS[clueId];
    if (clueCells && clueCells.length > 0) {
        currentRow = clueCells[0].row;
        currentCol = clueCells[0].col;
    }

    updateHighlighting();
    focusCell(currentRow, currentCol);
}

// ===== HIGHLIGHTING =====
function updateHighlighting() {
    // Clear all highlighting
    Object.values(cells).forEach(cell => {
        cell.classList.remove('highlighted', 'active');
    });

    // Clear active clue in lists
    document.querySelectorAll('.clue-item').forEach(el => {
        el.classList.remove('active-clue');
    });

    if (!currentClueId) return;

    // Highlight clue cells
    const clueCells = CLUE_CELLS[currentClueId];
    if (clueCells) {
        clueCells.forEach(c => {
            const cell = cells[`${c.row}-${c.col}`];
            if (cell) cell.classList.add('highlighted');
        });
    }

    // Mark active cell
    if (currentRow !== null && currentCol !== null) {
        const activeCell = cells[`${currentRow}-${currentCol}`];
        if (activeCell) activeCell.classList.add('active');
    }

    // Highlight clue in list
    const clueEl = document.querySelector(`.clue-item[data-clue-id="${currentClueId}"]`);
    if (clueEl) {
        clueEl.classList.add('active-clue');
        clueEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Update current clue display
    updateClueDisplay();
}

function updateClueDisplay() {
    const display = document.getElementById('current-clue-display');
    if (currentClueId) {
        const clue = CLUE_ANNOTATIONS[currentClueId];
        if (clue) {
            const label = getClueLabel(currentClueId);
            let text = '';
            clue.segments.forEach(seg => { text += seg.text; });
            display.innerHTML = `<strong>${label}:</strong> ${text} <span style="color:#6b7280">${clue.length}</span>`;
        }
    } else {
        display.textContent = 'Click a cell to begin';
    }
}

// ===== HELPERS =====
function findClueForCell(row, col, direction) {
    const suffix = direction === 'across' ? 'A' : 'D';
    const list = direction === 'across' ? ACROSS_CLUE_ORDER : DOWN_CLUE_ORDER;

    for (const id of list) {
        const clueCells = CLUE_CELLS[id];
        if (clueCells && clueCells.some(c => c.row === row && c.col === col)) {
            return id;
        }
    }
    return null;
}

function getCellInput(row, col) {
    const cell = cells[`${row}-${col}`];
    if (cell) return cell.querySelector('input');
    return null;
}

function focusCell(row, col) {
    const input = getCellInput(row, col);
    if (input) {
        input.focus();
        input.select();
    }
}

// ===== TOGGLE CONTROLS =====
function setupToggles() {
    const toggleDef = document.getElementById('toggle-def');
    const toggleFodder = document.getElementById('toggle-fodder');
    const toggleIndicator = document.getElementById('toggle-indicator');

    toggleDef.addEventListener('change', () => {
        document.body.classList.toggle('show-def', toggleDef.checked);
    });

    toggleFodder.addEventListener('change', () => {
        document.body.classList.toggle('show-fodder', toggleFodder.checked);
    });

    toggleIndicator.addEventListener('change', () => {
        document.body.classList.toggle('show-indicator', toggleIndicator.checked);
    });
}