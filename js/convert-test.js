let currentQuestion;
let startTime;
let questionCount = 0;
let correctAnswer;
const totalQuestions = 10;

function startGame() {
    startTime = new Date().getTime();
    questionCount = 0;
    generateQuestion();
    document.getElementById('progress').innerText = `◇${questionCount}問目◇（全${totalQuestions}問）`;
}

function generateQuestion() {
    questionCount++;
    if (questionCount > totalQuestions) {
        let endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000;
        let minutes = Math.floor(timeTaken / 60);
        let seconds = Math.floor(timeTaken % 60);
        alert("ゲーム終了！かかった時間: " + minutes + "分" + seconds + " 秒");
        return;
    }

    let questionBase = Math.floor(Math.random() * 3); // 0: 16進数, 1: 10進数, 2: 2進数
    let questionNumber;
    let answerBase;

    if (questionCount == totalQuestions){
        // 最終問だけ16進数3桁
        if (Math.random() < 0.5) {
            questionNumber = (Math.floor(Math.random() * 4096)).toString(16).toUpperCase();
            questionBase = 0; //16進数
            answerBase = 10;
        } else {
            questionNumber = (Math.floor(Math.random() * 4096)).toString(10).toUpperCase();
            questionBase = 1; //10進数
            answerBase = 16;
        }
    } else {
        if (questionBase === 0) { // 16進数
            questionNumber = (Math.floor(Math.random() * 256)).toString(16).toUpperCase();
            answerBase = Math.random() < 0.5 ? 10 : 2;
        } else if (questionBase === 1) { // 10進数
            questionNumber = (Math.floor(Math.random() * 256)).toString(10);
            answerBase = Math.random() < 0.5 ? 16 : 2;
        } else { // 2進数
            questionNumber = (Math.floor(Math.random() * 256)).toString(2);
            answerBase = Math.random() < 0.5 ? 10 : 16;
        }
    }

    currentQuestion = {
        number: questionNumber,
        questionBase: questionBase === 0 ? 16 : questionBase === 1 ? 10 : 2,
        answerBase: answerBase
    };

    correctAnswer = parseInt(currentQuestion.number, currentQuestion.questionBase).toString(currentQuestion.answerBase).toUpperCase();
    document.getElementById('model-answer').innerText = `${correctAnswer}`;
    document.getElementById('question').innerText = "次の " + (questionBase === 0 ? "16進数" : questionBase === 1 ? "10進数" : "2進数") + "の数値 " + questionNumber + " は" + answerBase + "進数でいくつ？";
    document.getElementById('answer').value = "";
    document.getElementById('truefalse').className = "";
    document.getElementById('progress').innerText = `質問数: ${questionCount}/${totalQuestions}`;
}

function checkAnswer() {
    let answer = document.getElementById('answer').value.trim();

    if (answer.toUpperCase() === correctAnswer) {
        document.getElementById('truefalse').className = "correct";
        setTimeout(generateQuestion, 500);
    } else {
        document.getElementById('truefalse').className = "incorrect";
        setTimeout(() => {
            document.getElementById('truefalse').className = "";
        }, 300);
    }

    document.getElementById('answer-details').removeAttribute('open');
}

document.getElementById('answer-form').addEventListener('submit', (event) => {
    event.preventDefault();
    checkAnswer();
    });

startGame();

setInterval(() => {
    if (questionCount <= totalQuestions) {
        let currentTime = new Date().getTime();
        let timeElapsed = ((currentTime - startTime) / 1000);
        let minutes = Math.floor(timeElapsed / 60);
        let seconds = Math.floor(timeElapsed % 60);
        document.getElementById('timer').innerText = `経過時間: ${minutes} 分 ${seconds} 秒`;
    }
}, 100);