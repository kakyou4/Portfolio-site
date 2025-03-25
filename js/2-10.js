document.addEventListener('DOMContentLoaded', (event) => {
  currentBinaryNumber = generateBinaryNumber();
});

function generateBinaryNumber() {
  let binaryNumber = (Math.floor(Math.random() * 16)).toString(2).padStart(4, '0');
  document.getElementById('binaryNumber').innerText = `変換する二進数: ${binaryNumber}`;
  return binaryNumber;
}

let currentBinaryNumber;

function checkAnswer(answer) {
  document.getElementById('selectedButton').innerText = `あなたが選んだ番号: ${answer}`;
  let decimalAnswer = parseInt(currentBinaryNumber, 2);
  let resultElement = document.getElementById('result');
  if (answer === decimalAnswer) {
      resultElement.innerText = "正解！次の問題へ進みます。";
      setTimeout(() => {
          currentBinaryNumber = generateBinaryNumber();
          resultElement.innerText = ""; // 結果メッセージをクリア
          document.getElementById('selectedButton').innerText = ""; // 選んだ番号をクリア
      }, 500);
  } else {
      resultElement.innerText = "不正解！もう一度試してみてください。";
  }
}
