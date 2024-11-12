
console.log("main.js load");

// ページ読み込み時にローカルストレージからデータをロード
window.addEventListener('load', loadFromLocalStorage);

// 勉強記録を保存する配列
let studyRecords = [];

// 勉強メーターの初期値
let totalStudyTime = 0;
let studyGoal = 6000; // 1000分を目標

// ボタン要素の取得
const startButton = document.getElementById("instrumentation_start");
const suspendButton = document.getElementById("suspend");

// 分表示を更新する関数
function updateDisplayTime() {
    const minutes = Math.floor(elapsedTime / 60000);
    document.getElementById("study_time").textContent = `${minutes}分`;
}

// サジェスト機能用：重複を排除した教材名リストを取得
function getUniqueStudyMaterials() {
    const materials = studyRecords.map(record => record.material);
    return [...new Set(materials)]; // 重複を排除してサジェストに表示
}

// 勉強履歴用：全教材名リストを取得
function getAllStudyMaterials() {
    return studyRecords.map(record => record.material); // 重複も保存
}

// サジェスト表示の際に呼び出す関数
function updateMaterialSuggestions(query = '') {
    const datalist = document.getElementById('studyMaterialSuggestions');
    datalist.innerHTML = ''; // 既存のサジェストをクリア

    // 重複排除した教材名リストから部分一致をフィルタリング
    const materials = getUniqueStudyMaterials().filter(material =>
        material.toLowerCase().includes(query.toLowerCase())
    );

    // サジェスト候補を追加
    materials.slice(-5).reverse().forEach(material => {
        const option = document.createElement('option');
        option.value = material;
        datalist.appendChild(option);
    });
}

// ローカルストレージから勉強記録を読み込む関数
function loadFromLocalStorage() {
    const storedRecords = localStorage.getItem('studyRecords');
    if (storedRecords) {
        studyRecords = JSON.parse(storedRecords);
        studyRecords.forEach(record => addRecordToHistory(record));
        // トータル勉強時間を計算
        totalStudyTime = studyRecords.reduce((acc, record) => acc + record.time, 0);
        // メーターを更新
        updateStudyMeter();
        // 合計時間を表示
        updateTotalStudyTime();
        // 初期サジェストを更新（最新5件）
        updateMaterialSuggestions();
    }
}

// 記録追加ボタンのクリックイベント
document.getElementById('addRecordBtn').addEventListener("click", () => {
    const material = document.getElementById("studyMaterial").value;
    const time = parseInt(document.getElementById("studyTime").value);
    const note = document.getElementById("studyNote").value;

    if (material && time > 0) {
        let record = {
            material: material,
            time: time,
            note: note
        };

        studyRecords.push(record);
        totalStudyTime += time;

        saveToLocalStorage();

        // 入力フィールドをクリア
        document.getElementById('studyMaterial').value = '';
        document.getElementById('studyTime').value = '';
        document.getElementById('studyNote').value = '';

        updateMaterialSuggestions(); // サジェストを更新
    } else {
        alert("勉強教材と時間を正しく入力してください。");
    }
});

// ローカルストレージに勉強記録を保存する関数
function saveToLocalStorage() {
    localStorage.setItem("studyRecords", JSON.stringify(studyRecords));
}

// 勉強履歴をリストに追加する関数
function addRecordToHistory(record) {
    const historyList = document.getElementById("historyList");
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    listItem.innerHTML = `
        <strong>${record.material}</strong> - ${record.time} 分
        <p>${record.note}</p>
    `;

    historyList.appendChild(listItem);
}

// ローカルストレージから勉強履歴を読み込み、表示する関数
function loadRecords() {
    const storedRecords = localStorage.getItem('studyRecords');
    if (storedRecords) {
        const studyRecords = JSON.parse(storedRecords);

        // 配列を逆順にして、新しいものが先に表示されるようにする
        studyRecords.reverse().forEach(record => addRecordToHistory(record));
    }
}

// 勉強履歴をリストに追加する関数
function addRecordToHistory(record) {
    const historyList = document.getElementById("historyList");
    if (historyList) {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        listItem.innerHTML = `
            <strong>${record.material}</strong> - ${record.time} 分
            <p>${record.note}</p>
        `;

        // 新しい要素をリストの先頭に追加
        historyList.prepend(listItem);
    }
}

// 勉強メーターを更新する関数
function updateStudyMeter() {
    const meter = document.getElementById("studyMeter");
    const percentage = Math.min((totalStudyTime / studyGoal) * 100, 100);
    meter.style.width = `${percentage}%`;

    if (percentage > 100) {
        meter.style.backgroundColor = "#28a745";
    } else if (percentage > 50) {
        meter.style.backgroundColor = "#ffc107";
    } else {
        meter.style.backgroundColor = "#0d6efd";
    }
}

// 合計勉強時間を「時分」形式で表示する関数
function updateTotalStudyTime() {
    const hours = Math.floor(totalStudyTime / 60);
    const minutes = totalStudyTime % 60;
    totalStudyTimeDisplay.textContent = `${hours} 時間 ${minutes} 分`;
}

// サジェストのリアルタイム更新
document.getElementById("studyMaterial").addEventListener("focus", () => updateMaterialSuggestions());
document.getElementById("studyMaterial").addEventListener("input", (event) => {
    updateMaterialSuggestions(event.target.value);
});

// ページが index.html のとき、勉強時間の自動入力
if (window.location.pathname.includes("index.html")) {
    window.addEventListener("load", () => {
        const studyTime = localStorage.getItem("studyTime");
        if (studyTime) {
            document.getElementById("studyTime").value = studyTime;
            localStorage.removeItem("studyTime");
        }
    });
}
