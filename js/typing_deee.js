// 変数の初期化
let questions = '';
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const questionfield = document.getElementById('questions');
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const counttyped = document.getElementById('counttyped');

// 出題用オブジェクトを作成
const q1 = { q_view: 'お疲れ様です', q_type: 'otsukaresamadesu'};
const q2 = { q_view: 'よろしくお願いいたします', q_type: 'yoroshikuonegaiitashimasu'};
const q3 = { q_view: '株式会社', q_type: 'kabushikigaisha'};
const q4 = { q_view: 'ありがとうございます', q_type: 'arigatougozaimasu'};
const q5 = { q_view: '申し訳ございません', q_type: 'moushiwakegozaimasenn'};
const q6 = { q_view: 'なるほどですね', q_type: 'naruhododesune'};
const q7 = { q_view: 'JANet', q_type: 'JANet'};
const q8 = { q_view: 'Smart-C', q_type: 'Smart-C'};
const q9 = { q_view: 'AppDriver', q_type: 'AppDriver'};
const q10 = { q_view: '体調不良のため', q_type: 'taichoufuryounotame'};
const q11 = { q_view: 'エビデンス', q_type: 'ebidennsu'};
const q12 = { q_view: 'imp', q_type: 'imp'};
const q13 = { q_view: 'click', q_type: 'click'};
const q14 = { q_view: 'action', q_type: 'action'};
const q15 = { q_view: 'グロス', q_type: 'gurosu'};
const q16 = { q_view: 'ネット', q_type: 'netto'};
const q17 = { q_view: '案件', q_type: 'annkenn'};
const q18 = { q_view: 'ご確認ください', q_type: 'gokakuninnkudasai'};
const q19 = { q_view: '広告', q_type: 'koukoku'};
const q20 = { q_view: 'マーチャント', q_type: 'ma-channto'};
const q21 = { q_view: 'クライアント', q_type: 'kuraiannto'};
const q22 = { q_view: '媒体', q_type: 'baitai'};
const q23 = { q_view: 'ポイントサイト', q_type: 'poinntosaito'};
const q24 = { q_view: '取引先', q_type: 'torihikisaki'};
const q25 = { q_view: '売上', q_type: 'uriage'};
const q26 = { q_view: '原価', q_type: 'gennka'};
const q27 = { q_view: '粗利', q_type: 'arari'};
const q28 = { q_view: 'マージン', q_type: 'ma-jinn'};
const q29 = { q_view: 'アジェンダ', q_type: 'ajennda'};
const q30 = { q_view: 'お休みさせていただきます', q_type: 'oyasumisaseteitadakimasu'};

//オブジェクトを格納する配列
const textLists = [
  q1, q2, q3, q4, q5, q6, q7, q8, q9, q10,
  q11, q12, q13, q14, q15, q16, q17, q18, q19, q20,
  q21, q22, q23, q24, q25, q26, q27, q28, q29, q30,
];

// ランダムなテキストを表示
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックスからランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  questions = textLists[random].q_view;
  questionfield.textContent = questions;

  untyped = textLists[random].q_type;
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if(e.key !== untyped.substring(0,1)) {
    wrap.classList.add('misstyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('misstyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  counttyped.textContent = score;

  // テキストがなくなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text =`あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text =`あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
    text =`あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text =`あなたのランクはSです。おめてどうございます！`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {

  clearInterval(id);
    questionfield.textContent = 'タイムアップ！';
    typedfield.textContent = '';
    untypedfield.textContent = '';

    // 10ms後にリザルトを表示
    setTimeout(() => {
      const result = confirm(rankCheck(score));
      
      // OKボタンをクリックされたらリロードする
      if(result == true) {
        window.location.reload();
      }
    }, 10);
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;
  const id =setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

questionfield.textContent = 'スタートボタンで開始';