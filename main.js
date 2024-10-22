console.log("main.js load");

// ページ読み込み時にローカルストレージからデータをロード
window.addEventListener('load', loadFromLocalStorage);

// 勉強記録を保存する配列
let studyRecords = [];

// 勉強メーターの初期値
let totalStudyTime = 0;
let studyGoal = 1000; // 1000分を目標

// 合計勉強時間を表示する要素を取得
const totalStudyTimeDisplay = document.getElementById('totalStudyTimeDisplay');

// 勉強記録をローカルストレージに保存する関数
function saveToLocalStorage() {
    localStorage.setItem('studyRecords', JSON.stringify(studyRecords));
}

// ローカルストレージから勉強記録を読み込む関数
function loadFromLocalStorage() {
    const storedRecords = localStorage.getItem('studyRecords');
    if (storedRecords) {
        studyRecords = JSON.parse(storedRecords);
        studyRecords.forEach(record => addRecordToHistory(record));
        // トータル勉強時間を計算
        totalStudyTime = studyRecords.reduce((acc, record) => acc + record.time, 0);
        //メーターを更新
        updateStudyMeter();
        // 合計時間を更新
        updateTotalStudyTime();
    }
}

// 勉強記録を追加するボタンのクリックイベント
document.getElementById('addRecordBtn').addEventListener('click', function() {
    const material = document.getElementById('studyMaterial').value;
    const time = parseInt(document.getElementById('studyTime').value);
    const note = document.getElementById('studyNote').value;

    // 入力が正しいか確認
    if (material && time > 0) {
        // 勉強記録をオブジェクトとして保存
        let record = {
            material: material,
            time: time,
            note: note
        };

        studyRecords.push(record);

        // トータル勉強時間を更新
        totalStudyTime += time;

        // ローカルストレージに保存
        saveToLocalStorage();

        // 入力フィールドをクリア
        document.getElementById('studyMaterial').value = '';
        document.getElementById('studyTime').value = '';
        document.getElementById('studyNote').value = '';
    } else {
        alert('勉強教材と時間を正しく入力してください。');
    }
});

// 勉強履歴をリストに追加する関数
function addRecordToHistory(record) {
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    // 記録を表示
    listItem.innerHTML = `
        <strong>${record.material}</strong> - ${record.time} 分
        <p>${record.note}</p>
    `;

    historyList.appendChild(listItem);
}

// 勉強メーターを更新する関数
function updateStudyMeter() {
    const meter = document.getElementById('studyMeter');
    const percentage = Math.min((totalStudyTime / studyGoal) * 100, 100); // 100%超えないようにする
    meter.style.width = `${percentage}%`;

    // メーターの色を変える（進行に応じて）
    if (percentage > 75) {
        meter.style.backgroundColor = '#28a745'; // 緑
    } else if (percentage > 50) {
        meter.style.backgroundColor = '#ffc107'; // 黄色
    } else {
        meter.style.backgroundColor = '#0d6efd'; // 青
    }
}

// 合計勉強時間を「時分」形式で表示する関数
function updateTotalStudyTime() {
    const hours = Math.floor(totalStudyTime / 60); // 分を時間に変換
    const minutes = totalStudyTime % 60;           // 残りの分を計算
    totalStudyTimeDisplay.textContent = `${hours} 時間 ${minutes} 分`;
}

// ローカルストレージに保存されている教材名リストを作成
function getStudyMaterials() {
    // 教材名のリストを重複なく抽出
    const materials = studyRecords.map(record => record.material);
    return [...new Set(materials)]; // 重複を排除
}

// 直近5件の教材名を取得する関数
function getRecentStudyMaterials() {
    const materials = getStudyMaterials();
    // 最新5件のみを返す
    return materials.slice(-5).reverse(); // 最新順で5件を返す
}

// 教材名のサジェストを表示するための datalist を更新する関数
function updateMaterialSuggestions(query = '') {
    const datalist = document.getElementById('studyMaterialSuggestions');
    datalist.innerHTML = ''; // 既存のサジェストをクリア

    // 最新5件の教材名を取得し、部分一致をフィルタリング
    const materials = getRecentStudyMaterials().filter(material =>
        material.toLowerCase().includes(query.toLowerCase())
    );

    // フィルタ結果があればサジェストに追加
    materials.forEach(material => {
        const option = document.createElement('option');
        option.value = material;
        datalist.appendChild(option); // サジェストに追加
    });
}

// 勉強教材の入力フィールドで部分一致を基にサジェストを更新
document.getElementById('studyMaterial').addEventListener('input', function(event) {
    const query = event.target.value; // ユーザーが入力した文字列
    updateMaterialSuggestions(query); // 部分一致でサジェストを更新
});

// ページ読み込み時にローカルストレージからデータをロード
window.addEventListener('load', loadFromLocalStorage);


