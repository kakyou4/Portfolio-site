// キャンバスとそのコンテキストを取得
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// キャンバスのスケール設定
function adjustCanvasScale() {
  const scale = Math.min(window.innerWidth / 460, 1); // 460px未満の場合は縮小
  canvas.style.transform = `scale(${scale})`; // キャンバス全体の見た目を縮小
  canvas.style.transformOrigin = "top left"; // スケールの基準点を左上に設定
}

// 初回スケール調整
adjustCanvasScale();

// ウィンドウリサイズに対応
window.addEventListener("resize", adjustCanvasScale);

// 選択したブロックとオフセット
let selectedBlock = null;
let offsetX = 0, offsetY = 0;

// ゲームボードの設定
const boardSize = 7; // 7×7のマス
const cellSize = canvas.width / boardSize; // 各マスのサイズ

const selected_offset = -3; // 選択されたブロックを右上に3pxずらす設定

// ブロックデータの定義
const blocks = [
  {
    id: 1,
    color: 'olivedrab',
    positions: [ [0, 0], [0, 1] ]
  },
  {
    id: 2,
    color: 'royalblue',
    positions: [ [0, 2], [0, 3], [0, 4], [1, 3] ]
  },
  {
    id: 3,
    color: 'gold',
    positions: [ [0, 5], [0, 6] ]
  },
  {
    id: 4,
    color: 'lightcoral',
    positions: [ [1, 2], [2, 2] ]
  },
  {
    id: 5,
    color: 'lightcoral',
    positions: [ [1, 4], [2, 4] ]
  },
  {
    id: 6,
    color: 'olivedrab',
    positions: [ [1, 5] ]
  },
  {
    id: 7,
    color: 'plum',
    positions: [ [2, 0], [2, 1], [3, 0], [3, 1] ]
  },
  {
    id: 8,
    color: 'gold',
    positions: [ [2, 3], [3, 2], [3, 3], [3, 4], [4, 3] ]
  },
  {
    id: 9,
    color: 'plum',
    positions: [ [2, 5], [2, 6], [3, 5], [3, 6] ]
  },
  {
    id: 10,
    color: 'lightskyblue',
    positions: [ [4, 0], [5, 0], [6, 0], [6, 1] ]
  },
  {
    id: 11,
    color: 'lightcoral',
    positions: [ [4, 2], [5, 2] ]
  },
  {
    id: 12,
    color: 'lightcoral',
    positions: [ [4, 4], [5, 4] ]
  },
  {
    id: 13,
    color: 'royalblue',
    positions: [ [4, 6], [5, 6], [6, 6], [6, 5] ]
  },
  {
    id: 14,
    color: 'plum',
    positions: [ [5, 3] ]
  },
  {
    id: 15,
    color: 'lightsalmon',
    positions: [ [5, 5] ]
  },
  {
    id: 16,
    color: 'lightsalmon',
    positions: [ [6, 3] ]
  }
];

// 出口データの定義
const exits = [
  { 
    id: 101,
    color: 'royalblue',
    start: [0, 0],
    size: 2,
    direction: 'top'
  },
  { 
    id: 102,
    color: 'lightskyblue',
    start: [0, 4],
    size: 3,
    direction: 'top'
  },
  { 
    id: 103,
    color: 'lightcoral',
    start: [2, 0],
    size: 2,
    direction: 'left'
  },
  { 
    id: 104,
    color: 'olivedrab',
    start: [2, 6],
    size: 2,
    direction: 'right'
  },
  { 
    id: 105,
    color: 'gold',
    start: [4, 0],
    size: 2,
    direction: 'left'
  },
  { 
    id: 106,
    color: 'royalblue',
    start: [4, 6],
    size: 2,
    direction: 'right'
  },
  { 
    id: 107,
    color: 'plum',
    start: [6, 0],
    size: 3,
    direction: 'bottom'
  },
  { 
    id: 108,
    color: 'lightsalmon',
    start: [6, 4],
    size: 3,
    direction: 'bottom'
  }
];

// ゲームボードを描画する関数
function drawBackground(ctx) {
  ctx.fillStyle = "#f4f4f4"; // 背景色
  ctx.fillRect(0, 0, canvas.width, canvas.height); // 全体を塗りつぶす

  // グリッド線を描画
  
  
}

// 出口を描画
function drawExits(ctx, exits) {
  exits.forEach(exit => {
    ctx.fillStyle = exit.color; // 出口の色
    const [row, col] = exit.start;

    if (exit.direction === "top" || exit.direction === "bottom") {
      ctx.fillRect(col * 60, row * 60, exit.size * 60, 60); // 水平方向
    } else {
      ctx.fillRect(col * 60, row * 60, 60, exit.size * 60); // 垂直方向
    }
  });
}

// ブロックを描画
// function drawBlocks(ctx, exits) {
//   blocks.forEach(block => {
//     ctx.fillStyle = block.color; //ブロックの色を設定

//     block.positions.forEach(position => {
//       const [row, col] = position;
//       const x = col * cellSize + (block === selectedBlock ? selected_offset : 0);
//       const y = row * cellSize + (block === selectedBlock ? selected_offset : 0);

//       ctx.fillRect(x, y, cellSize, cellSize);
//     });
//   });
// }

// ブロック移動の制限
// function canMove(block, newPositions) {
//   for (let position of newPositions) {
//     const [row, col] = position;

//     // ボードの外に出ていないか確認
//     if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
//       return false;
//     }

//     // 他のブロックと重なっていないか確認
//     for (let otherBlock of blocks) {
//       if (otherBlock.id !== block.id) {
//         for (let otherPosition of otherBlock.positions) {
//           if (otherPosition[0] === row && otherPosition[1] === col) {
//             return false;
//           }
//         }
//       }
//     }
//   }
//   return true; // 問題がなければ移動可能
// }

// // マウスダウン時、どのブロックが選ばれたかを特定
// canvas.addEventListener('mousedown', (e) => {
//   const mouseX = e.offsetX;
//   const mouseY = e.offsetY;

//   // ピクセル座標をグリッドの行列に変換
//   const col = Math.floor(mouseX / cellSize);
//   const row = Math.floor(mouseY / cellSize);

//   // クリック位置に対応するブロックを検索
//   selectedBlock = null; // 初期化

//   // for...of文でブロックを特定
//   for (let block of blocks) {
//     for (let position of block.positions) {
//       if (position[0] === row && position[1] === col) {
//         selectedBlock = block;
//         offsetX = mouseX - col * cellSize + selected_offset;
//         offsetY = mouseY - row * cellSize - selected_offset;
//         break;
//       }
//     }
//     if (selectedBlock) break;
//   }

//   if (selectedBlock) {
//     drawBackground();
//     drawBlocks();
//   }

//   // 結果を確認（デバッグ用）
//   if (selectedBlock) {
//     console.log(`Selected Block ID: ${selectedBlock.id}`);
//   } else {
//     console.log("No block selected.");
//   }  
// });

// // ドラッグ中のブロック位置更新
// canvas.addEventListener('mousemove', (e) => {
//   if (selectedBlock) {
//     const mouseX = e.offsetX;
//     const mouseY = e.offsetY;

//     // 新しいマス位置を計算
//     const newCol = Math.floor((mouseX - offsetX) / cellSize);
//     const newRow = Math.floor((mouseY - offsetY) / cellSize);

//     // ブロックの新しい位置を計算
//     const newPositions = selectedBlock.positions.map((_, index) => [
//       newRow + (index === 0 ? 0 : selectedBlock.positions[index][0] - selectedBlock.positions[0][0]),
//       newCol + (index === 0 ? 0 : selectedBlock.positions[index][1] - selectedBlock.positions[0][1])
//     ]);

//     // セーフティエリアを考慮して移動可能か確認
//     if (canMove(selectedBlock, newPositions)) {
//       selectedBlock.positions = newPositions;
//       drawBackground();
//       drawBlocks();
//     }
//   }
// });

// canvas.addEventListener('mouseup', () => {
//   if (selectedBlock) {
//     const blockToSnap = selectedBlock;
//     selectedBlock = null; // 選択解除

//     // ブロックのみにスナップ処理
//     blockToSnap.positions = blockToSnap.positions.map(position => {
//       const [row, col] = position;
//       return [
//         Math.round(row), // 行を丸める
//         Math.round(col)  // 列を丸める
//       ];
//     });    
    
//     drawBackground();
//     drawBlocks();
//     drawExits();
//   }
// });

// ゲームボードを描画
drawBackground(ctx);
drawExits(ctx, exits);
// drawBlocks();