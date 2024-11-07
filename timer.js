// タイマー機能の変数
let startTime;
let elapsedTime = 0;
let timerInterval;

// ボタン要素の取得
const startButton = document.getElementById("instrumentation_start");
const suspendButton = document.getElementById("suspend");

// 分表示を更新する関数
function updateDisplayTime() {
    const minutes = Math.floor(elapsedTime / 60000);
    document.getElementById("study_time").textContent = `${minutes}分`;
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
    // タイマーが停止中の場合にのみスタートする
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime; // 開始時に経過時間を考慮
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplayTime();
        }, 1000);

        // ボタンの色を変更
        resetButtonStyles(); // 両方のボタンの色をリセット
        startButton.classList.remove("btn-primary");
        startButton.classList.add("btn-success");
    }
});

// 一時停止ボタン
suspendButton.addEventListener("click", () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;

        // ボタンの色を変更
        resetButtonStyles();
        suspendButton.classList.remove("btn-primary");
        suspendButton.classList.add("btn-success");
    }
});

// 計測終了ボタン
document.getElementById("instrumentation_end").addEventListener("click", () => {
    clearInterval(timerInterval);
    const minutes = Math.floor(elapsedTime / 60000);
    localStorage.setItem("studyTime", minutes);
    elapsedTime = 0;
    startTime = null;

    // ボタンのスタイルをリセット
    resetButtonStyles();
});
