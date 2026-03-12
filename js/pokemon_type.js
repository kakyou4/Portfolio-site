// 1.定数・データ定義
const pokemonForms = [
  { id: "1_1", name: "ピカチュウ", type1: 4 },
  { id: "2_1", name: "ラルトス", type1: 11, type2:18 },
];

const typeNames = {
  1: "ノーマル",
  2: "ほのお",
  3: "みず",
  4: "でんき",
  5: "くさ",
  6: "こおり",
  7: "かくとう",
  8: "どく",
  9: "じめん",
  10: "ひこう",
  11: "エスパー",
  12: "むし",
  13: "いわ",
  14: "ゴースト",
  15: "ドラゴン",
  16: "あく",
  17: "はがね",
  18: "フェアリー"
}

const typeChart = [
  { atkId: 1, defId: 13, rate: 0.5 },  // ノーマル技はいわタイプに0.5倍
  { atkId: 1, defId: 14, rate: 0 },    // ノーマル技はゴーストタイプに無効
  { atkId: 1, defId: 17, rate: 0.5 },  // ノーマル技ははがねタイプに0.5倍
  { atkId: 2, defId: 2, rate: 0.5 },   // ほのお技はほのおタイプに0.5倍
  { atkId: 2, defId: 3, rate: 0.5 },   // ほのお技はみずタイプに0.5倍
  { atkId: 2, defId: 5, rate: 2 },     // ほのお技はくさタイプに2倍
  { atkId: 2, defId: 6, rate: 2 },     // ほのお技はこおりタイプに2倍
  { atkId: 2, defId: 12, rate: 2 },    // ほのお技はむしタイプに2倍
  { atkId: 2, defId: 13, rate: 0.5 },  // ほのお技はいわタイプに0.5倍
  { atkId: 2, defId: 15, rate: 0.5 },  // ほのお技はドラゴンタイプに0.5倍
  { atkId: 2, defId: 17, rate: 2 },    // ほのお技ははがねタイプに2倍
  { atkId: 3, defId: 2, rate: 2 },     // みず技はほのおタイプに2倍
  { atkId: 3, defId: 3, rate: 0.5 },   // みず技はみずタイプに0.5倍
  { atkId: 3, defId: 5, rate: 0.5 },   // みず技はくさタイプに0.5倍
  { atkId: 3, defId: 9, rate: 2 },     // みず技はじめんタイプに2倍
  { atkId: 3, defId: 13, rate: 2 },    // みず技はいわタイプに2倍
  { atkId: 3, defId: 15, rate: 0.5 },  // みず技はドラゴンタイプに0.5倍
  { atkId: 4, defId: 3, rate: 2 },     // でんき技はみずタイプに2倍
  { atkId: 4, defId: 4, rate: 0.5 },   // でんき技はでんきタイプに0.5倍
  { atkId: 4, defId: 5, rate: 0.5 },   // でんき技はくさタイプに0.5倍
  { atkId: 4, defId: 9, rate: 0 },     // でんき技はじめんタイプに無効
  { atkId: 4, defId: 10, rate: 2 },    // でんき技はひこうタイプに2倍
  { atkId: 4, defId: 15, rate: 0.5 },  // でんき技はドラゴンタイプに0.5倍
  { atkId: 5, defId: 2, rate: 0.5 },   // くさ技はほのおタイプに0.5倍
  { atkId: 5, defId: 3, rate: 2 },     // くさ技はみずタイプに2倍
  { atkId: 5, defId: 5, rate: 0.5 },   // くさ技はくさタイプに0.5倍
  { atkId: 5, defId: 8, rate: 0.5 },   // くさ技はどくタイプに0.5倍
  { atkId: 5, defId: 9, rate: 2 },     // くさ技はじめんタイプに2倍
  { atkId: 5, defId: 10, rate: 0.5 },  // くさ技はひこうタイプに0.5倍
  { atkId: 5, defId: 12, rate: 0.5 },  // くさ技はむしタイプに0.5倍
  { atkId: 5, defId: 13, rate: 2 },    // くさ技はいわタイプに2倍
  { atkId: 5, defId: 15, rate: 0.5 },  // くさ技はドラゴンタイプに0.5倍
  { atkId: 5, defId: 17, rate: 0.5 },  // くさ技ははがねタイプに0.5倍
  { atkId: 6, defId: 2, rate: 0.5 },   // こおり技はほのおタイプに0.5倍
  { atkId: 6, defId: 3, rate: 0.5 },   // こおり技はみずタイプに0.5倍
  { atkId: 6, defId: 5, rate: 2 },     // こおり技はくさタイプに2倍
  { atkId: 6, defId: 6, rate: 0.5 },   // こおり技はこおりタイプに0.5倍
  { atkId: 6, defId: 9, rate: 2 },     // こおり技はじめんタイプに2倍
  { atkId: 6, defId: 10, rate: 2 },    // こおり技はひこうタイプに2倍
  { atkId: 6, defId: 15, rate: 2 },    // こおり技はドラゴンタイプに2倍
  { atkId: 6, defId: 17, rate: 0.5 },  // こおり技ははがねタイプに0.5倍
  { atkId: 7, defId: 1, rate: 2 },     // かくとう技はノーマルタイプに2倍
  { atkId: 7, defId: 6, rate: 2 },     // かくとう技はこおりタイプに2倍
  { atkId: 7, defId: 8, rate: 0.5 },   // かくとう技はどくタイプに0.5倍
  { atkId: 7, defId: 10, rate: 0.5 },  // かくとう技はひこうタイプに0.5倍
  { atkId: 7, defId: 11, rate: 0.5 },  // かくとう技はエスパータイプに0.5倍
  { atkId: 7, defId: 12, rate: 0.5 },  // かくとう技はむしタイプに0.5倍
  { atkId: 7, defId: 13, rate: 2 },    // かくとう技はいわタイプに2倍
  { atkId: 7, defId: 14, rate: 0 },    // かくとう技はゴーストタイプに無効
  { atkId: 7, defId: 16, rate: 2 },    // かくとう技はあくタイプに2倍
  { atkId: 7, defId: 17, rate: 2 },    // かくとう技ははがねタイプに2倍
  { atkId: 7, defId: 18, rate: 0.5 },  // かくとう技はフェアリータイプに0.5倍
  { atkId: 8, defId: 5, rate: 2 },     // どく技はくさタイプに2倍
  { atkId: 8, defId: 8, rate: 0.5 },   // どく技はどくタイプに0.5倍
  { atkId: 8, defId: 9, rate: 0.5 },   // どく技はじめんタイプに0.5倍
  { atkId: 8, defId: 13, rate: 0.5 },  // どく技はいわタイプに0.5倍
  { atkId: 8, defId: 14, rate: 0.5 },  // どく技はゴーストタイプに0.5倍
  { atkId: 8, defId: 17, rate: 0 },    // どく技ははがねタイプに無効
  { atkId: 8, defId: 18, rate: 0 },    // どく技はフェアリータイプに無効
  { atkId: 9, defId: 2, rate: 2 },     // じめん技はほのおタイプに2倍
  { atkId: 9, defId: 4, rate: 2 },     // じめん技はでんきタイプに2倍
  { atkId: 9, defId: 5, rate: 0.5 },   // じめん技はくさタイプに0.5倍
  { atkId: 9, defId: 8, rate: 2 },     // じめん技はどくタイプに2倍
  { atkId: 9, defId: 10, rate: 0 },    // じめん技はひこうタイプに無効
  { atkId: 9, defId: 12, rate: 0.5 },  // じめん技はむしタイプに0.5倍
  { atkId: 9, defId: 13, rate: 2 },    // じめん技はいわタイプに2倍
  { atkId: 9, defId: 17, rate: 2 },    // じめん技ははがねタイプに2倍
  { atkId: 10, defId: 4, rate: 0.5 },  // ひこう技はでんきタイプに0.5倍
  { atkId: 10, defId: 5, rate: 2 },    // ひこう技はくさタイプに2倍
  { atkId: 10, defId: 7, rate: 2 },    // ひこう技はかくとうタイプに2倍
  { atkId: 10, defId: 12, rate: 2 },   // ひこう技はむしタイプに2倍
  { atkId: 10, defId: 13, rate: 0.5 }, // ひこう技はいわタイプに0.5倍
  { atkId: 10, defId: 17, rate: 0.5 }, // ひこう技ははがねタイプに0.5倍
  { atkId: 11, defId: 7, rate: 2 },    // エスパー技はかくとうタイプに2倍
  { atkId: 11, defId: 8, rate: 2 },    // エスパー技はどくタイプに2倍
  { atkId: 11, defId: 11, rate: 0.5 }, // エスパー技はエスパータイプに0.5倍
  { atkId: 11, defId: 16, rate: 0 },   // エスパー技はあくタイプに無効
  { atkId: 11, defId: 17, rate: 0.5 }, // エスパー技ははがねタイプに0.5倍
  { atkId: 12, defId: 2, rate: 0.5 },  // むし技はほのおタイプに0.5倍
  { atkId: 12, defId: 5, rate: 2 },    // むし技はくさタイプに2倍
  { atkId: 12, defId: 7, rate: 0.5 },  // むし技はかくとうタイプに0.5倍
  { atkId: 12, defId: 8, rate: 0.5 },  // むし技はどくタイプに0.5倍
  { atkId: 12, defId: 10, rate: 0.5 }, // むし技はひこうタイプに0.5倍
  { atkId: 12, defId: 11, rate: 2 },   // むし技はエスパータイプに2倍
  { atkId: 12, defId: 14, rate: 0.5 }, // むし技はゴーストタイプに0.5倍
  { atkId: 12, defId: 16, rate: 2 },   // むし技はあくタイプに2倍
  { atkId: 12, defId: 17, rate: 0.5 }, // むし技ははがねタイプに0.5倍
  { atkId: 12, defId: 18, rate: 0.5 }, // むし技はフェアリータイプに0.5倍
  { atkId: 13, defId: 2, rate: 2 },    // いわ技はほのおタイプに2倍
  { atkId: 13, defId: 6, rate: 2 },    // いわ技はこおりタイプに2倍
  { atkId: 13, defId: 7, rate: 0.5 },  // いわ技はかくとうタイプに0.5倍
  { atkId: 13, defId: 9, rate: 0.5 },  // いわ技はじめんタイプに0.5倍
  { atkId: 13, defId: 10, rate: 2 },   // いわ技はひこうタイプに2倍
  { atkId: 13, defId: 12, rate: 2 },   // いわ技はむしタイプに2倍
  { atkId: 13, defId: 17, rate: 0.5 }, // いわ技ははがねタイプに0.5倍
  { atkId: 14, defId: 1, rate: 0 },    // ゴースト技はノーマルタイプに無効
  { atkId: 14, defId: 11, rate: 2 },   // ゴースト技はエスパータイプに2倍
  { atkId: 14, defId: 14, rate: 2 },   // ゴースト技はゴーストタイプに2倍
  { atkId: 14, defId: 16, rate: 0.5 }, // ゴースト技はあくタイプに0.5倍
  { atkId: 15, defId: 15, rate: 2 },   // ドラゴン技はドラゴンタイプに2倍
  { atkId: 15, defId: 17, rate: 0.5 }, // ドラゴン技ははがねタイプに0.5倍
  { atkId: 15, defId: 18, rate: 0 },   // ドラゴン技はフェアリータイプに無効
  { atkId: 16, defId: 7, rate: 0.5 },  // あく技はかくとうタイプに0.5倍
  { atkId: 16, defId: 11, rate: 2 },   // あく技はエスパータイプに2倍
  { atkId: 16, defId: 14, rate: 2 },   // あく技はゴーストタイプに2倍
  { atkId: 16, defId: 16, rate: 0.5 }, // あく技はあくタイプに0.5倍
  { atkId: 16, defId: 18, rate: 0.5 }, // あく技はフェアリータイプに0.5倍
  { atkId: 17, defId: 2, rate: 0.5 },  // はがね技はほのおタイプに0.5倍
  { atkId: 17, defId: 3, rate: 0.5 },  // はがね技はみずタイプに0.5倍
  { atkId: 17, defId: 4, rate: 0.5 },  // はがね技はでんきタイプに0.5倍
  { atkId: 17, defId: 6, rate: 2 },    // はがね技はこおりタイプに2倍
  { atkId: 17, defId: 13, rate: 2 },   // はがね技はいわタイプに2倍
  { atkId: 17, defId: 17, rate: 0.5 }, // はがね技ははがねタイプに0.5倍
  { atkId: 17, defId: 18, rate: 2 },   // はがね技はフェアリータイプに2倍
  { atkId: 18, defId: 2, rate: 0.5 },  // フェアリー技はほのおタイプに0.5倍
  { atkId: 18, defId: 7, rate: 2 },    // フェアリー技はかくとうタイプに2倍
  { atkId: 18, defId: 8, rate: 0.5 },  // フェアリー技はどくタイプに0.5倍
  { atkId: 18, defId: 15, rate: 2 },   // フェアリー技はドラゴンタイプに2倍
  { atkId: 18, defId: 16, rate: 2 },   // フェアリー技はあくタイプに2倍
  { atkId: 18, defId: 17, rate: 0.5 } // フェアリー技ははがねタイプに0.5倍
]

// 2.DOMの取得
const poke = document.getElementById("poke");
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const search = document.getElementById("search");

const x4 = document.getElementById("x4");
const x2 = document.getElementById("x2");
const x1_2 = document.getElementById("x1_2");
const x1_4 = document.getElementById("x1_4");
const x0 = document.getElementById("x0");

// 3.関数
function getRate(defId, atkId) {
  if (defId === 0) return 1; // 未選択は等倍扱い
  for (const row of typeChart) {
    if (row.atkId === atkId && row.defId === defId) {
      return row.rate;
    }
  }
  return 1; //見つからなければ等倍
}

function getPoke(name) {
  return pokemonForms.find(p => p.name ===name); //『p』はコールバック関数の引数
}
// 検索不一致の場合、『p』には『undefined』が入る

function applyTypes(poke) {
  if (!poke) return;
  type1.value = poke.type1;
  type2.value = poke.type2 ?? "0";
}

// 4.イベント
// 4-1.UI制御
type1.onchange = () => {
  type2.disabled = (type1.value === "0");
  search.disabled = (type1.value === "0");
};

// 4-2.検索処理
search.onclick = () => {
  console.log("search.onclick fired");
  if (type1.value === "0") return; // type1 が未選択なら何も起こらない

  const result = {
    x4: [],
    x2: [],
    x1_2: [],
    x1_4: [],
    x0: []
  };

  for (let atk = 1; atk <= 18; atk++) {
    const r1 = getRate(Number(type1.value), atk);
    const r2 = getRate(Number(type2.value), atk);
    const total = r1 * r2;

    switch (total) {
      case 4: result.x4.push(atk); break;
      case 2: result.x2.push(atk); break;
      case 0.5: result.x1_2.push(atk); break;
      case 0.25: result.x1_4.push(atk); break;
      case 0: result.x0.push(atk); break;
    }
  }

  x4.textContent = result.x4.map(id => typeNames[id]).join(" / ");
  x2.textContent = result.x2.map(id => typeNames[id]).join(" / ");
  x1_2.textContent = result.x1_2.map(id => typeNames[id]).join(" / ");
  x1_4.textContent = result.x1_4.map(id => typeNames[id]).join(" / ");
  x0.textContent = result.x0.map(id => typeNames[id]).join(" / ");
};

// 4-3.タイプ呼び出し
poke.onchange = () => {
  const name = poke.value.trim(); //DOMのpokeの値を格納
  const p    = getPoke(name);     //関数を呼び出して結果を格納
  if (p) {applyTypes(p);}

  if (name === "") {
    type1.disabled = false;
    type2.disabled = false;
  }

  if (name !== "") {
    type1.disabled = true;
    type2.disabled = true;
  }
};

// デバッグ