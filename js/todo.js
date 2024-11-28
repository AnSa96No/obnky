console.log("todo.js load");

document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");
    const addTodoBtn = document.getElementById("addTodoBtn");
    const createTodoBtn = document.getElementById("createTodoBtn");
    const saveTodoBtn = document.getElementById("saveTodoBtn");
    const deleteTodoBtn = document.getElementById("deleteTodoBtn");
    const createTodoModal = new bootstrap.Modal(document.getElementById("createTodoModal"));
    const editTodoModal = new bootstrap.Modal(document.getElementById("editTodoModal"));
    const createTodoTitle = document.getElementById("createTodoTitle");
    const createTodoDescription = document.getElementById("createTodoDescription");
    const editTodoTitle = document.getElementById("editTodoTitle");
    const editTodoDescription = document.getElementById("editTodoDescription");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let editingTodoIndex = null;

    // ToDoリストをロードして表示する関数
    function loadTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div class="container">
                        <input type="checkbox" class="form-check-input me-2" data-index="${index}" ${todo.completed ? "checked" : ""}>
                        <strong>${todo.title}</strong>
                        <p class="mb-0">${todo.description}</p>
                    </div>
                    <button class="btn btn-outline-dark btn-sm edit-btn" data-index="${index}">編集</button>
                </div>
            `;
            todoList.appendChild(listItem);
        });
    }

    // 新規作成ボタンをクリックしたときの処理
    addTodoBtn.addEventListener("click", () => {
        // 入力フィールドを初期化
        createTodoTitle.value = "";
        createTodoDescription.value = "";

        // 新規作成モーダルを表示
        createTodoModal.show();
    });

    // 新しいToDoを作成する関数
    createTodoBtn.addEventListener("click", () => {
        const title = createTodoTitle.value.trim();
        const description = createTodoDescription.value.trim();

        if (!title) {
            alert("件名を入力してください。");
            return;
        }

        todos.push({ title, description, completed: false });
        localStorage.setItem("todos", JSON.stringify(todos));

        loadTodos();
        createTodoModal.hide();
        createTodoTitle.value = "";
        createTodoDescription.value = "";
    });

    // 編集ボタンをクリックしたときの処理
    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const index = e.target.dataset.index;
            const todo = todos[index];
            editTodoTitle.value = todo.title;
            editTodoDescription.value = todo.description;
            editingTodoIndex = index;
            editTodoModal.show();
        }
    });

    // 編集モーダルで保存ボタンをクリックしたときの処理
    saveTodoBtn.addEventListener("click", () => {
        const title = editTodoTitle.value.trim();
        const description = editTodoDescription.value.trim();

        if (!title) {
            alert("件名を入力してください。");
            return;
        }

        if (editingTodoIndex !== null) {
            todos[editingTodoIndex] = { ...todos[editingTodoIndex], title, description };
            localStorage.setItem("todos", JSON.stringify(todos));

            loadTodos();
            editTodoModal.hide();
            editingTodoIndex = null;
        }
    });

    // 編集モーダルで削除ボタンをクリックしたときの処理
    deleteTodoBtn.addEventListener("click", () => {
        if (editingTodoIndex !== null) {
            if (confirm("本当に削除しますか？")) {
                todos.splice(editingTodoIndex, 1);
                localStorage.setItem("todos", JSON.stringify(todos));

                loadTodos();
                editTodoModal.hide();
                editingTodoIndex = null;
            }
        }
    });

    // ページ読み込み時にToDoリストを表示
    loadTodos();
});
