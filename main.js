// console.log("main.js load");

// // ページ読み込み時にローカルストレージからデータをロード
// window.addEventListener('load', loadFromLocalStorage);

// // 勉強記録を保存する配列
// let studyRecords = [];

// // 勉強メーターの初期値
// let totalStudyTime = 0;
// let studyGoal = 1000; // 1000分を目標

// // 合計勉強時間を表示する要素を取得
// const totalStudyTimeDisplay = document.getElementById('totalStudyTimeDisplay');

// // 勉強記録をローカルストレージに保存する関数
// function saveToLocalStorage() {
//     localStorage.setItem('studyRecords', JSON.stringify(studyRecords));
// }

// // ローカルストレージから勉強記録を読み込む関数
// function loadFromLocalStorage() {
//     const storedRecords = localStorage.getItem('studyRecords');
//     if (storedRecords) {
//         studyRecords = JSON.parse(storedRecords);
//         studyRecords.forEach(record => addRecordToHistory(record));
//         // トータル勉強時間を計算
//         totalStudyTime = studyRecords.reduce((acc, record) => acc + record.time, 0);
//         //メーターを更新
//         updateStudyMeter();
//         // 合計時間を更新
//         updateTotalStudyTime();
//         // 初期サジェストを更新（最新5件）
//         updateMaterialSuggestions();
//     }
// }

// // 勉強記録を追加するボタンのクリックイベント
// document.getElementById('addRecordBtn').addEventListener('click', function() {
//     const material = document.getElementById('studyMaterial').value;
//     const time = parseInt(document.getElementById('studyTime').value);
//     const note = document.getElementById('studyNote').value;

//     // 入力が正しいか確認
//     if (material && time > 0) {
//         // 勉強記録をオブジェクトとして保存
//         let record = {
//             material: material,
//             time: time,
//             note: note
//         };

//         studyRecords.push(record);

//         // トータル勉強時間を更新
//         totalStudyTime += time;

//         // ローカルストレージに保存
//         saveToLocalStorage();

//         // 入力フィールドをクリア
//         document.getElementById('studyMaterial').value = '';
//         document.getElementById('studyTime').value = '';
//         document.getElementById('studyNote').value = '';
//     } else {
//         alert('勉強教材と時間を正しく入力してください。');
//     }
// });

// // 勉強履歴をリストに追加する関数
// function addRecordToHistory(record) {
//     const historyList = document.getElementById('historyList');
//     const listItem = document.createElement('li');
//     listItem.classList.add('list-group-item');

//     // 記録を表示
//     listItem.innerHTML = `
//         <strong>${record.material}</strong> - ${record.time} 分
//         <p>${record.note}</p>
//     `;

//     historyList.appendChild(listItem);
// }

// // 勉強メーターを更新する関数
// function updateStudyMeter() {
//     const meter = document.getElementById('studyMeter');
//     const percentage = Math.min((totalStudyTime / studyGoal) * 100, 100); // 100%超えないようにする
//     meter.style.width = `${percentage}%`;

//     // メーターの色を変える（進行に応じて）
//     if (percentage > 75) {
//         meter.style.backgroundColor = '#28a745'; // 緑
//     } else if (percentage > 50) {
//         meter.style.backgroundColor = '#ffc107'; // 黄色
//     } else {
//         meter.style.backgroundColor = '#0d6efd'; // 青
//     }
// }

// // 合計勉強時間を「時分」形式で表示する関数
// function updateTotalStudyTime() {
//     const hours = Math.floor(totalStudyTime / 60); // 分を時間に変換
//     const minutes = totalStudyTime % 60;           // 残りの分を計算
//     totalStudyTimeDisplay.textContent = `${hours} 時間 ${minutes} 分`;
// }

// // ローカルストレージに保存されている教材名リストを作成
// function getStudyMaterials() {
//     // 教材名のリストを重複なく抽出
//     const materials = studyRecords.map(record => record.material);
//     return [...new Set(materials)]; // 重複を排除
// }

// // 直近5件の教材名を取得する関数
// function getRecentStudyMaterials() {
//     const materials = getStudyMaterials();
//     // 最新5件のみを返す
//     return materials.slice(-5).reverse(); // 最新順で5件を返す
// }

// // 教材名のサジェストを表示するための datalist を更新する関数
// function updateMaterialSuggestions(query = '') {
//     const datalist = document.getElementById('studyMaterialSuggestions');
//     datalist.innerHTML = ''; // 既存のサジェストをクリア

//     // 最新5件の教材名を取得し、部分一致をフィルタリング
//     const materials = getRecentStudyMaterials().filter(material =>
//         material.toLowerCase().includes(query.toLowerCase())
//     );

//     // 直近5件を制限し表示
//     const recentMaterials = materials.slice(-5).reverse();

//     // フィルタ結果があればサジェストに追加
//     materials.forEach(material => {
//         const option = document.createElement('option');
//         option.value = material;
//         datalist.appendChild(option); // サジェストに追加
//     });
// }

// // 勉強教材の入力フィールドにフォーカスした際に直近の5件を表示
// document.getElementById('studyMaterial').addEventListener('focus', function() {
//     updateMaterialSuggestions(); // フォーカス時に直近5件の教材名を表示
// });

// // 勉強教材の入力フィールドで部分一致を基にサジェストを更新
// document.getElementById('studyMaterial').addEventListener('input', function(event) {
//     const query = event.target.value; // ユーザーが入力した文字列
//     updateMaterialSuggestions(query); // 部分一致でサジェストを更新
// });

// // ページ読み込み時にローカルストレージからデータをロード
// window.addEventListener('load', loadFromLocalStorage);


console.log("main.js load");

// ページ読み込み時にローカルストレージからデータをロード
window.addEventListener('load', loadFromLocalStorage);

// 勉強記録を保存する配列
let studyRecords = [];

// 勉強メーターの初期値
let totalStudyTime = 0;
let studyGoal = 1000; // 1000分を目標

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
        addRecordToHistory(record); // 履歴リストに表示

        document.getElementById("studyMaterial").value = '';
        document.getElementById("studyTime").value = '';
        document.getElementById("studyNote").value = '';

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

// 勉強メーターを更新する関数
function updateStudyMeter() {
    const meter = document.getElementById("studyMeter");
    const percentage = Math.min((totalStudyTime / studyGoal) * 100, 100);
    meter.style.width = `${percentage}%`;

    if (percentage > 4800) {
        meter.style.backgroundColor = "#28a745";
    } else if (percentage > 180) {
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
