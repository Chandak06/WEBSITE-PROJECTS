const socket = io();
const chess = new Chess();
const boardEl = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
  const board = chess.board();
  boardEl.innerHTML = "";
  board.forEach((row, rowIndex) => {
    row.forEach((square, squareIndex) => {
      const squareEl = document.createElement("div");
      squareEl.classList.add(
        "square",
        (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
      );
      squareEl.dataset.row = rowIndex;
      squareEl.dataset.col = squareIndex;

      if (square) {
        const pieceEl = document.createElement("div");
        pieceEl.classList.add("piece", square.color === "w" ? "white" : "black");
        pieceEl.innerText = getPieceUnicode(square.type, square.color);
        pieceEl.draggable = playerRole === square.color;

        pieceEl.addEventListener("dragstart", (e) => {
          if (pieceEl.draggable) {
            draggedPiece = pieceEl;
            sourceSquare = { row: rowIndex, col: squareIndex };
            e.dataTransfer.setData("text/plain", "");
          }
        });

        pieceEl.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });

        squareEl.appendChild(pieceEl);
      }

      squareEl.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      squareEl.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSource = {
            row: parseInt(squareEl.dataset.row),
            col: parseInt(squareEl.dataset.col),
          };
          handleMove(sourceSquare, targetSource);
        }
      });

      boardEl.appendChild(squareEl); // FIXED: was appending `square`
    });
  });
};

const handleMove = (from, to) => {
  const fromSquare = String.fromCharCode(97 + from.col) + (8 - from.row);
  const toSquare = String.fromCharCode(97 + to.col) + (8 - to.row);

  const move = chess.move({ from: fromSquare, to: toSquare }); // FIXED variable name

  if (move) {
    socket.emit("move", move);
    renderBoard(); // Optional: update UI after valid move
  } else {
    console.log("Invalid Move");
  }
};

const getPieceUnicode = (type, color) => {
 const unicodePieces = {
    p: "♟", // black pawn
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    P: "♙", // white pawn
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔",
  };

  return unicodePieces[type] || ""; // FIXED: was using `piece.type`
};

renderBoard();
