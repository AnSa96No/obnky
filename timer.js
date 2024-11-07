console.log("timer.js load");

// タイマー機能の変数
let startTime;
let elapsedTime = 0;
let timerInterval;

// ボタン要素の取得
const startButton = document.getElementById("instrumentation_start");
const suspendButton = document.getElementById("suspend");

// 分秒表示を更新する関数
function updateDisplayTime() {
    const minutes = Math.floor(elapsedTime / 60000); // 分
    const seconds = Math.floor((elapsedTime % 60000) / 1000); // 秒
    document.getElementById("study_time").textContent = `${minutes}分${seconds}秒`;
}

// ボタンのスタイルをリセットする関数
function resetButtonStyles() {
    startButton.classList.remove("btn-success");
    suspendButton.classList.remove("btn-success");
    startButton.classList.add("btn-primary");
    suspendButton.classList.add("btn-primary");
}

// 計測開始ボタン
startButton.addEventListener("click", () => {
    console.log("計測開始");
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplayTime();
        }, 1000);

        resetButtonStyles();
        startButton.classList.remove("btn-primary");
        startButton.classList.add("btn-success");
    }
});

// 一時停止ボタン
suspendButton.addEventListener("click", () => {
    console.log("一時停止");
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;

        resetButtonStyles();
        suspendButton.classList.remove("btn-primary");
        suspendButton.classList.add("btn-success");
    }
});

// 計測終了ボタン
document.getElementById("instrumentation_end").addEventListener("click", () => {
    clearInterval(timerInterval);
    const minutes = Math.floor(elapsedTime / 60000); // 分単位に変換
    localStorage.setItem("studyTime", minutes); // 分のみを保存
    elapsedTime = 0;
    startTime = null;

    resetButtonStyles();
});
