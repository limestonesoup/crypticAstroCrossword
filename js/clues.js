/**
 * CLUES RENDERING
 *
 * Handles rendering clue lists with annotation support.
 */

function renderClues() {
    const acrossList = document.getElementById('across-list');
    const downList = document.getElementById('down-list');

    ACROSS_CLUE_ORDER.forEach(id => {
        const clue = CLUE_ANNOTATIONS[id];
        const el = createClueElement(id, clue);
        acrossList.appendChild(el);
    });

    DOWN_CLUE_ORDER.forEach(id => {
        const clue = CLUE_ANNOTATIONS[id];
        const el = createClueElement(id, clue);
        downList.appendChild(el);
    });
}

function createClueElement(id, clue) {
    const div = document.createElement('div');
    div.className = 'clue-item';
    div.dataset.clueId = id;

    const numSpan = document.createElement('span');
    numSpan.className = 'clue-number';
    numSpan.textContent = clue.number;

    const textSpan = document.createElement('span');
    textSpan.className = 'clue-text';

    // Build segmented text
    clue.segments.forEach(seg => {
        const s = document.createElement('span');
        s.className = `clue-segment seg-${seg.type}`;
        s.textContent = seg.text;
        textSpan.appendChild(s);
    });

    // Add length indicator
    const lengthSpan = document.createElement('span');
    lengthSpan.className = 'clue-length';
    lengthSpan.textContent = ' ' + clue.length;
    textSpan.appendChild(lengthSpan);

    div.appendChild(numSpan);
    div.appendChild(textSpan);

    // Click handler
    div.addEventListener('click', () => {
        selectClue(id);
    });

    return div;
}

/**
 * Get the plain text of a clue (for display below grid)
 */
function getClueText(id) {
    const clue = CLUE_ANNOTATIONS[id];
    if (!clue) return '';
    let text = '';
    clue.segments.forEach(seg => {
        text += seg.text;
    });
    return clue.number + (clue.direction === 'across' ? 'A' : 'D') + '. ' + text + ' ' + clue.length;
}

/**
 * Get clue display label
 */
function getClueLabel(id) {
    const clue = CLUE_ANNOTATIONS[id];
    if (!clue) return '';
    return clue.number + ' ' + (clue.direction === 'across' ? 'Across' : 'Down');
}