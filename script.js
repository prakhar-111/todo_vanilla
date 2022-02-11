import {
  createDb,
  addTodo,
  editTodo,
  removeTodo,
  modifyTodoState,
  createTodoObject,
  findTodo,
  localArr,
} from "./storage.js";

import {
  renderTodo,
  renderAll,
  deleteTodo,
  deleteAll,
  leftTodos,
  toggleTodo,
} from "./render.js";

//localStorage.clear();
createDb("pendingTodos");

localStorage.setItem("filterState", "all");

// window.addEventListener("load", (event) => {
//   if (localStorage.getItem("pendingTodos")) {
//     localArr = JSON.parse(localStorage.getItem("pendingTodos"));
//     //localArr = todoList;
//     renderAll(todoList);
//   }
// });

// window.addEventListener("unload", (event) => {
//   localStorage.setItem("pendingTodos", JSON.stringify(localArr));
// });

let enterTodo = document.querySelector("#enterTodo");
enterTodo.addEventListener(
  "blur",
  (e) => {
    if (enterTodo.value !== "") {
      let newTodoObject = createTodoObject(enterTodo.value);
      addTodo(newTodoObject, "pendingTodos");
      enterTodo.value = "";

      renderTodo(newTodoObject);
    }
  },
  true
);
enterTodo.addEventListener("keyup", (e) => {
  if (enterTodo.value !== "" && e.code === "Enter") {
    let newTodoObject = createTodoObject(enterTodo.value);
    addTodo(newTodoObject, "pendingTodos");
    enterTodo.value = "";

    renderTodo(newTodoObject);
  }
});

let activeButton = document.querySelector("#active");
let allButton = document.querySelector("#all");
let completedAll = document.querySelector("#clearCompleted");
let selectAllCheck = document.querySelector("#selectAll");
let completedButton = document.querySelector("#completed");

activeButton.addEventListener("click", function (event) {
  event.preventDefault();
  deleteAll();
  this.classList.add("highlight");
  if (allButton.classList.contains("highlight")) {
    allButton.classList.remove("highlight");
  }
  if (completedButton.classList.contains("highlight")) {
    completedButton.classList.remove("highlight");
  }
  localStorage.setItem("filterState", "active");
  //   if (localStorage.getItem("pendingTodos")) {
  //     let todoList = JSON.parse(localStorage.getItem("pendingTodos"));
  //     let activeTodoList = todoList.filter(
  //       (element) => element.isCompleted === false
  //     );
  //     renderAll(activeTodoList);
  //   }

  let activeTodoList = localArr.filter(
    (element) => element.isCompleted === false
  );
  renderAll(activeTodoList);
});

completedButton.addEventListener("click", function (event) {
  event.preventDefault();
  deleteAll();
  this.classList.add("highlight");
  if (allButton.classList.contains("highlight")) {
    allButton.classList.remove("highlight");
  }
  if (activeButton.classList.contains("highlight")) {
    activeButton.classList.remove("highlight");
  }
  localStorage.setItem("filterState", "complete");
  //   if (localStorage.getItem("pendingTodos")) {
  //     let todoList = JSON.parse(localStorage.getItem("pendingTodos"));
  //     let completedTodoList = todoList.filter(
  //       (element) => element.isCompleted === true
  //     );
  //     renderAll(completedTodoList);
  //   }

  let completedTodoList = localArr.filter(
    (element) => element.isCompleted === true
  );
  renderAll(completedTodoList);
});

allButton.addEventListener("click", function (event) {
  event.preventDefault();
  deleteAll();
  this.classList.add("highlight");
  if (activeButton.classList.contains("highlight")) {
    activeButton.classList.remove("highlight");
  }
  if (completedButton.classList.contains("highlight")) {
    completedButton.classList.remove("highlight");
  }
  localStorage.setItem("filterState", "all");
  //   if (localStorage.getItem("pendingTodos")) {
  //     let todoList = JSON.parse(localStorage.getItem("pendingTodos"));
  //     renderAll(todoList);
  //   }
  renderAll(localArr);
});

completedAll.addEventListener("click", function (event) {
  event.preventDefault();
  //   let todoList = JSON.parse(localStorage.getItem("pendingTodos"));
  //   todoList.forEach((element) => {
  //     if (element.isCompleted === true) {
  //       removeTodo(element.id, "pendingTodos");
  //       deleteTodo(element.id);
  //     }
  //   });

  localArr.forEach((element) => {
    //console.log(localArr);
    if (element.isCompleted === true) {
      console.log(element);
      removeTodo(parseInt(element.id), "pendingTodos");
      deleteTodo(parseInt(element.id));
    }
  });
  leftTodos();
});

selectAllCheck.addEventListener(
  "click",
  function (event) {
    if (this.checked) {
      document.querySelectorAll("[check-id]").forEach((element) => {
        if (!element.checked) {
          element.checked = true;
          let todoId = parseInt(element.getAttribute("check-id"));
          //console.log(todoId); //
          modifyTodoState(todoId, "pendingTodos");
          toggleTodo(todoId);
          leftTodos();

          element.previousSibling.style.opacity = 1;

          if (localStorage.getItem("filterState") === "active") {
            deleteTodo(element.getAttribute("check-id"));
          }
          if (localStorage.getItem("filterState") === "complete") {
            deleteTodo(element.getAttribute("check-id"));
          }
        }
      });
    } else {
      // $("[check-id]").trigger("click");
      document.querySelectorAll("[check-id]").forEach((element) => {
        // if (!element.checked) {
        element.checked = false;
        let todoId = parseInt(element.getAttribute("check-id"));
        //console.log(todoId); //
        modifyTodoState(todoId, "pendingTodos");
        toggleTodo(todoId);
        leftTodos();

        $("#selectAll").prop("checked", false);
        element.parentNode.style.opacity = 1;
        element.previousSibling.style.opacity = 0;

        if (localStorage.getItem("filterState") === "active") {
          deleteTodo(element.getAttribute("check-id"));
        }
        if (localStorage.getItem("filterState") === "complete") {
          deleteTodo(element.getAttribute("check-id"));
        }
        // }
      });
    }
  },
  true
);
