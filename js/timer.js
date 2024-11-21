console.log("timer.js load");

// タイマー機能の変数
let startTime;
let elapsedTime = 0;
let timerInterval;

// ボタン要素の取得
const startButton = document.getElementById("instrumentation_start");
const suspendButton = document.getElementById("suspend");

// 時分秒の表示関数
function updateDisplayTime() {
    const totalSeconds = Math.floor(elapsedTime / 1000); // 経過時間を秒単位に
    const hours = Math.floor(totalSeconds / 3600); // 時間
    const minutes = Math.floor((totalSeconds % 3600) / 60); // 分
    const seconds = totalSeconds % 60; // 秒

    // 時分秒の形式で表示
    document.getElementById("study_time").textContent = `${hours}時間${minutes}分${seconds}秒`;
}

// 計測開始ボタン
document.getElementById("instrumentation_start").addEventListener("click", () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplayTime();
        }, 1000);
    }

    resetButtonStyles();
    startButton.classList.remove("btn-primary");
    startButton.classList.add("btn-info");
});

// 一時停止ボタン
document.getElementById("suspend").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;

    resetButtonStyles();
    suspendButton.classList.remove("btn-primary");
    suspendButton.classList.add("btn-info");
});

// 計測終了ボタン
document.getElementById("instrumentation_end").addEventListener("click", () => {
    clearInterval(timerInterval);

    // 経過時間を分に変換して保存
    const totalMinutes = Math.floor(elapsedTime / 60000); // 分単位に変換
    localStorage.setItem("studyTime", totalMinutes); // 分のみを保存

    // タイマーリセット
    elapsedTime = 0;
    startTime = null;
});

// ボタンのスタイルをリセットする関数
function resetButtonStyles() {
    startButton.classList.remove("btn-info");
    suspendButton.classList.remove("btn-info");
    startButton.classList.add("btn-primary");
    suspendButton.classList.add("btn-primary");
}