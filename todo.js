/* ===== ROUTE PROTECTION ===== */
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

/* ===== LOGOUT FUNCTIONALITY ===== */
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

/* ===== TODO LOGIC ===== */
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let editMode = false;
let taskBeingEdited = null;

addBtn.addEventListener("click", addOrEdit);

function addOrEdit() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Enter a task");
    return;
  }

  if (editMode) {
    taskBeingEdited.textContent = text;
    addBtn.textContent = "Add";
    editMode = false;
    taskBeingEdited = null;
  } else {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="icons">
        <input type="checkbox" class="delete">
      </div>
      <span class="task-text">${text}</span>
      <div class="icons">
        <i class="fa-solid fa-pen-to-square edit" title="Edit"></i>
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

    deleteCheckbox.addEventListener("change", () => {
      if (deleteCheckbox.checked) {
        setTimeout(() => {
          li.remove();
        }, 1000);
      }
    });

    taskList.appendChild(li);
  }

  taskInput.value = "";
}
