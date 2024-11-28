    console.log("record.js load")

    // 全体の更新関数
    function updateTotalTimeAndMeter() {
    const storedRecords = JSON.parse(localStorage.getItem('studyRecords')) || [];

    // 合計時間を再計算
    const totalStudyTime = storedRecords.reduce((acc, record) => acc + record.time, 0);

    // 合計時間の表示を更新
    const totalStudyTimeDisplay = document.getElementById('totalStudyTimeDisplay');
    if (totalStudyTimeDisplay) {
        const hours = Math.floor(totalStudyTime / 60);
        const minutes = totalStudyTime % 60;
        totalStudyTimeDisplay.textContent = `${hours} 時間 ${minutes} 分`;
    }

    // メーターの更新
    const studyGoal = 6000; // 目標時間
    const percentage = Math.min((totalStudyTime / studyGoal) * 100, 100);
    const studyMeter = document.getElementById("studyMeter");
    if (studyMeter) {
        studyMeter.style.width = `${percentage}%`;
        studyMeter.style.backgroundColor =
            percentage >= 100 ? "#28a745" :
            percentage >= 50 ? "#ffc107" : "#0d6efd";
    }
}

// 全ての履歴を削除
document.getElementById("clearAllRecords").addEventListener("click", () => {
    if (confirm("本当に全ての履歴を削除しますか？")) {
        localStorage.removeItem('studyRecords'); // データ削除
        document.getElementById("historyList").innerHTML = ''; // 表示クリア
        updateTotalTimeAndMeter(); // 合計時間とメーターを更新
        alert("全ての履歴が削除されました。");
    }
});

// 個別削除ボタンのクリックイベント
document.getElementById("historyList").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const listItem = e.target.closest("li");
        const material = listItem.dataset.material; // 教材名
        const time = parseInt(listItem.dataset.time); // 勉強時間

        // 確認ダイアログの表示
        const isConfirmed = confirm(`"${material}" (${time}分) を削除しますか？`);
        if (!isConfirmed) {
            return; // ユーザーがキャンセルした場合、削除を中断
        }

        // ローカルストレージから該当の記録を削除
        const storedRecords = JSON.parse(localStorage.getItem("studyRecords")) || [];
        const updatedRecords = storedRecords.filter(
            record => !(record.material === material && record.time === time)
        );

        // ローカルストレージを更新
        localStorage.setItem("studyRecords", JSON.stringify(updatedRecords));

        // 表示から削除
        listItem.remove();
        alert("選択した履歴が削除されました。");

        // 初期の合計時間とメーターを更新
        updateTotalTimeAndMeter();

    }
});

// 初期ロード時に履歴とメーターを表示
document.addEventListener('DOMContentLoaded', () => {
    updateTotalTimeAndMeter(); // 初期の合計時間とメーターを更新
});
