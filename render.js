import { removeTodo, modifyTodoState, editTodo, localArr } from "./storage.js";

function leftTodos() {
  //   if (localStorage.getItem("pendingTodos")) {
  //let todoList = JSON.parse(localStorage.getItem("pendingTodos"));
  let todosLeft = 0;
  let totalTodos = 0;
  // todoList.forEach((element) => {
  //   totalTodos = totalTodos + 1;
  //   if (element.isCompleted === false) {
  //     todosLeft = todosLeft + 1;
  //   }
  // });

  localArr.forEach((element) => {
    totalTodos = totalTodos + 1;
    if (element.isCompleted === false) {
      todosLeft = todosLeft + 1;
    }
  });

  let totalStat = document.querySelector(".totalTodos");
  //console.log(todosLeft);
  totalStat.innerHTML = `${todosLeft} items left`;
  if (totalTodos === 0) {
    document.querySelector("footer").classList.add("removeFooter");
    document.querySelector(".box").classList.add("boxHide");
  } else {
    if (document.querySelector("footer").classList.contains("removeFooter")) {
      document.querySelector("footer").classList.remove("removeFooter");
      document.querySelector(".box").classList.remove("boxHide");
    }
  }
  //   }
}

function renderTodo(todoObject) {
  //   console.log(typeof todoObject.id);
  let todoId = todoObject.id;
  let newDiv = document.createElement("div");
  newDiv.classList.add("todoDiv");
  newDiv.setAttribute("div-id", todoId);
  let checkLabel = document.createElement("label");
  checkLabel.classList.add("checkLabel");
  checkLabel.setAttribute("label-id", todoId);
  checkLabel.innerText = "⃝";
  //   checkLabel.innerText = "✔️";
  let checkSpan = document.createElement("div");
  checkSpan.classList.add("tickSpan");
  checkSpan.innerText = "✓";
  checkLabel.appendChild(checkSpan);
  let newCheck = document.createElement("input");
  newCheck.setAttribute("type", "checkbox");
  newCheck.setAttribute("check-id", todoId);
  // newCheck.addEventListener("click", function (event) {
  //   modifyTodoState(todoId, "pendingTodos");
  //   console.log(todoId);
  //   toggleTodo(todoId);
  //   leftTodos();
  //   if (!this.checked) {
  //     $("#selectAll").prop("checked", false);
  //     this.parentNode.style.opacity = 1;
  //     this.previousSibling.style.opacity = 0;
  //   }
  //   if (this.checked) {
  //     // this.parentNode.style.opacity = 0;
  //     this.previousSibling.style.opacity = 1;
  //   }
  //   if (localStorage.getItem("filterState") === "active") {
  //     deleteTodo(this.getAttribute("check-id"));
  //   }
  //   if (localStorage.getItem("filterState") === "complete") {
  //     deleteTodo(this.getAttribute("check-id"));
  //   }
  // });
  checkLabel.appendChild(newCheck);

  let editInput = document.createElement("input");
  editInput.setAttribute("input-id", todoId);
  editInput.setAttribute("readonly", true);
  //editInput.setAttribute("ondblclick", "this.readOnly=''");

  editInput.addEventListener(
    "blur",
    function (e) {
      if (this.value !== "") {
        editTodo(this.value, todoId, "pendingTodos");
      } else {
        removeTodo(todoId, "pendingTodos");
        deleteTodo(todoId);
        leftTodos();
      }
      editInput.setAttribute("readonly", true);
      this.parentNode.classList.remove("focusdiv");
    },
    true
  );

  // editInput.addEventListener("dblclick", function (e) {
  //   this.removeAttribute("readonly");
  //   $(`[remove-id = ${todoId}]`).css("opacity", 0);
  //   this.parentNode.classList.add("focusdiv");
  // });

  //   editInput.addEventListener("click", function (e) {
  //     $(`[remove-id = ${todoId}]`).css("opacity", 0);
  //   });

  // editInput.addEventListener("mouseenter", function (e) {
  //   $(`[remove-id = ${todoId}]`).css("opacity", 0.2);
  // });

  // editInput.addEventListener("mouseleave", function (e) {
  //   $(`[remove-id = ${todoId}]`).css("opacity", 0);
  // });

  let removeButton = document.createElement("button");
  removeButton.setAttribute("remove-id", todoId);
  removeButton.innerHTML = "❌";
  // removeButton.addEventListener("click", (event) => {
  //   // event.preventDefault();
  //   // removeTodo(todoId, "pendingTodos");
  //   // deleteTodo(todoId);
  //   // leftTodos();
  // });
  if (todoObject.isCompleted) {
    editInput.classList.add("strike");
    newCheck.checked = true;
    newCheck.previousSibling.style.opacity = 1;
  }
  editInput.value = todoObject.Value;
  newDiv.appendChild(checkLabel);
  newDiv.appendChild(editInput);
  newDiv.appendChild(removeButton);
  let mainDiv = document.querySelector(".listOfTodos");
  mainDiv.appendChild(newDiv);

  leftTodos();
}

function renderAll(todoArr) {
  todoArr.forEach((element) => {
    renderTodo(element);
  });
}

function deleteTodo(todoId) {
  console.log(todoId);
  let mainDiv = document.querySelector(".listOfTodos");
  let removedNode = document.querySelector(`[div-id = "${todoId}"]`);
  //console.log(removedNode);
  mainDiv.removeChild(removedNode);
}

function deleteAll() {
  let allTodos = document.querySelectorAll(".todoDiv");
  //let mainDiv = document.querySelector(".listOfTodos");
  allTodos.forEach((element) => {
    element.remove();
  });
}

function toggleTodo(todoId) {
  let toggleNode = document.querySelector(`[input-id = "${todoId}"]`);
  toggleNode.classList.toggle("strike");
}

let todoContainer = document.querySelector(".listOfTodos");

todoContainer.addEventListener("click", function (event) {
  let target = event.target;
  if (target.hasAttribute("check-id")) {
    let todoId = parseInt(target.getAttribute("check-id"));
    //console.log(todoId); //
    modifyTodoState(todoId, "pendingTodos");
    toggleTodo(todoId);
    leftTodos();
    if (!target.checked) {
      $("#selectAll").prop("checked", false);
      target.parentNode.style.opacity = 1;
      target.previousSibling.style.opacity = 0;
    }
    if (target.checked) {
      // this.parentNode.style.opacity = 0;
      target.previousSibling.style.opacity = 1;
    }
    if (localStorage.getItem("filterState") === "active") {
      deleteTodo(target.getAttribute("check-id"));
    }
    if (localStorage.getItem("filterState") === "complete") {
      deleteTodo(target.getAttribute("check-id"));
    }
  } else if (target.hasAttribute("remove-id")) {
    let todoId = parseInt(target.getAttribute("remove-id"));
    event.preventDefault();
    removeTodo(todoId, "pendingTodos");
    deleteTodo(todoId);
    leftTodos();
  }
});

todoContainer.addEventListener("dblclick", function (event) {
  let target = event.target;
  let todoId = parseInt(target.getAttribute("input-id"));
  target.removeAttribute("readonly");
  $(`[remove-id = ${todoId}]`).css("opacity", 0);
  target.parentNode.classList.add("focusdiv");
});

export { renderTodo, renderAll, deleteTodo, deleteAll, leftTodos, toggleTodo };
