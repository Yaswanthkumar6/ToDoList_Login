if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let editMode = false;
let taskBeingEdited = null;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
loadTasks();

addBtn.addEventListener("click", addOrEdit);

function addOrEdit() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Enter a task");
    return;
  }

  if (editMode) {
    const index = tasks.indexOf(taskBeingEdited.textContent);
    tasks[index] = text;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskBeingEdited.textContent = text;
    addBtn.textContent = "Add";
    editMode = false;
    taskBeingEdited = null;
  } else {
    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const li = createTask(text);
    taskList.appendChild(li);
  }

  taskInput.value = "";
}

function loadTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    taskList.appendChild(createTask(task));
  });
}

function createTask(text) {
  const li = document.createElement("li");

  li.innerHTML = `
    <div class="icons">
      <input type="checkbox" class="delete">
    </div>
    <span class="task-text">${text}</span>
    <div class="icons">
      <i class="fa-solid fa-pen-to-square edit"></i>
    </div>
  `;

  const editIcon = li.querySelector(".edit");
  const deleteCheckbox = li.querySelector(".delete");
  const taskSpan = li.querySelector(".task-text");

  editIcon.addEventListener("click", () => {
    taskInput.value = taskSpan.textContent;
    taskInput.focus();
    addBtn.textContent = "Edit";
    editMode = true;
    taskBeingEdited = taskSpan;
  });

  deleteCheckbox.addEventListener("change", function () {
  if (deleteCheckbox.checked) {

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i] === taskSpan.textContent) {
        tasks[i] = "";
        break;
      }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
  }
});


  return li;
}
