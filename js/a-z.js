//初期設定（変数の宣言、DOM要素の取得）
window.onload = function() {
    showStartScreen();
};

// ゲームが開始されたかどうかのフラグ
let gameStarted = false;

const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // A〜Zのキー配列
let currentIndex = 0; // 現在の入力すべきキーのインデックス

const playarea = document.getElementById('playarea');
const typeword = document.getElementById('typeword');
const timer = document.getElementById('timer');
const cleartime = document.getElementById('cleartime');
const misstype = document.getElementById('misstype');
let missList = new Set();

let timerInterval; // タイマーの管理
let startTime; // ゲーム開始時間

//イベントリスナー

// スペースキーでゲームを開始
document.addEventListener("keydown", function(event) {
	const isRetryScreen = window.getComputedStyle(document.getElementById("result")).display == "none"; // リザルト画面が非表示ならture 
	if ( event.key === " " && !gameStarted ) {
		if ( isRetryScreen ) {
			startGame();
			gameStarted = true;
		} else {
			event.returnValue = false;
			location.reload(); // リロード
		}
	}
});

// 各キーを取得判定
document.addEventListener("keydown", function(event) {
	const pressedKey = event.key.toUpperCase(); // 押されたキーを取得（大文字変換）

	if (event.key !== " ") {
		if (pressedKey === keys[currentIndex] && gameStarted) {
			if (currentIndex < keys.length - 1) {
				currentIndex++;
				typeword.textContent = keys[currentIndex];
				highlightNextKey();
			} else {
    				endGame();
			}
		} else {
			missList.add(keys[currentIndex]);
			// 背景を一瞬赤にしてエラーであることを示す
			playarea.classList.add("misstyped_area");
			setTimeout(() => {
				playarea.classList.remove("misstyped_area");
			}, 100);
			return;
		}
	}
});


//ゲームの進行管理
function showStartScreen() {
	document.getElementById("startButton").style.display = "block";
	document.getElementById("typeword").style.display = "none";
	document.getElementById("result").style.display = "none";
}

function startGame() {
	document.getElementById("startButton").style.display = "none";
	document.getElementById("typeword").style.display = "block";
	document.getElementById("result").style.display = "none";
	timerStart();
	currentIndex = 0;
	highlightNextKey();
}

function endGame() {
	timerStop();
	gameStarted = false;
	if ( missList.size == 0 ) {
		missList.add(" Nothing !!");
	}
	misstype.textContent = Array.from(missList).join(", ");
	document.getElementById("playarea").style.display = "none";
	document.getElementById("result").style.display = "block";
}

function highlightNextKey() {
	// 次のキーに対応する要素を取得（key1 ～ key4 のいずれか）
	const nextKeyElement = document.querySelector(`[data-key="${keys[currentIndex]}"]`);

	// すべてのキーから "active" を削除
	document.querySelectorAll(".key1, .key2, .key3, .key4").forEach(key => {
		key.classList.remove("active");
	});

	// 次のキーに "active" を追加（存在する場合）
	if (nextKeyElement) {
		nextKeyElement.classList.add("active");
	}
}

// カウントダウンタイマー
function timerStart() {
	startTime = Date.now(); // ゲーム開始時間を記録
	timerInterval = setInterval(() => {
		timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2) ;
	}, 100); // 0.1秒ごとに更新
}

function timerStop() {
	clearInterval(timerInterval); // タイマー停止
	const timeRecord = Date.now() - startTime ;
	let rank;
	if ( timeRecord <= 3000 ) {
		rank = "S";
	} else if ( timeRecord <= 10000 ) {
		rank = "A";
	} else if ( timeRecord <= 20000 ) {
		rank = "B";
	} else if ( timeRecord <= 30000 ) {
		rank = "C";
	} else {
		rank = "D";
	}
	document.getElementById('rank').textContent = rank;
	cleartime.textContent = (timeRecord / 1000).toFixed(2) ; // 最終タイムを表示
}


