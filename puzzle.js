export function puzzle(installPda) {

  const isCorrect = (correctOrder, currentOrder) => {
    return correctOrder.every((val, i) => val === currentOrder[i]);
  };

  const shuffle = (arr) => {
    const copy = [...arr];
    let emptyIndex = copy.length - 1;
    const adjacentMoves = [-1, 1, -3, 3];

    for (let i = 0; i < 100; i++) {
      const possibleMoves = adjacentMoves.filter((move) => {
        const newIndex = emptyIndex + move;
        const row = Math.floor(emptyIndex / 3);
        const col = emptyIndex % 3;
        const newRow = Math.floor(newIndex / 3);
        const newCol = newIndex % 3;
        return (
          newIndex >= 0 &&
          newIndex < 9 &&
          ((row === newRow && Math.abs(col - newCol) === 1) ||
            (col === newCol && Math.abs(row - newRow) === 1))
        );
      });

      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [copy[emptyIndex], copy[emptyIndex + move]] = [copy[emptyIndex + move], copy[emptyIndex]];
      emptyIndex += move;
    }

    return copy;
  };

  const isAdjacentToEmpty = (index, emptyIndex) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    return (row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1);
  };

  const fillGrid = (items, letters) => {
    const shuffled = shuffle(letters.slice(0));
    items.forEach((item, i) => {
      item.innerText = shuffled[i];
      if (shuffled[i] === '') {
        item.classList.add('empty');
        state.emptyIndex = i;
      }
    });
  };

  const moveTile = (index, emptyIndex) => {
    const tile = document.getElementById(`tile${index}`);
    const emptyTile = document.getElementById(`tile${emptyIndex}`);
    const value = tile.innerText;
    tile.innerText = '';
    tile.classList.add('empty');
    emptyTile.innerText = value;
    emptyTile.classList.remove('empty');
  };

  const tileClick = (index) => {
    if (isAdjacentToEmpty(index, state.emptyIndex)) {
      moveTile(index, state.emptyIndex);
      state.emptyIndex = index;
      const currentOrder = Array.from(document.querySelectorAll('li')).map(item => item.innerText);
      if (isCorrect(letters, currentOrder)) {
        showModal();
      }
    }
  };

  const showModal = () => {
    installPda(); // Call the installPda function when the puzzle is solved
  };

  const letters = ['╔', '♔', '╗', '↯', '', '☆', '╚', '◉', '╝'];

  let ul = document.querySelectorAll('li');
  const state = {};

  const setUp = () => {
    fillGrid(ul, letters);
    ul.forEach((tile, index) => {
      tile.setAttribute('id', `tile${index}`);
      tile.addEventListener('click', () => tileClick(index));
    });
  };

  setUp();
}
