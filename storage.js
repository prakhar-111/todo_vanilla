import { renderAll } from "./render.js";

let localArr = [];

window.addEventListener("load", (event) => {
  if (localStorage.getItem("pendingTodos")) {
    localArr = JSON.parse(localStorage.getItem("pendingTodos"));
    //localArr = todoList;
    renderAll(localArr);
  }
});

window.addEventListener("unload", (event) => {
  localStorage.setItem("pendingTodos", JSON.stringify(localArr));
});

function createDb(dbName) {
  if (!localStorage.getItem(dbName)) {
    let newTodoList = [];
    localStorage.setItem(dbName, JSON.stringify(newTodoList));
  }
}

function createTodoObject(todoValue) {
  let todoObject = {
    id: Date.now(),
    Value: todoValue,
    isCompleted: false,
  };
  return todoObject;
}

function addTodo(todoObject, dbName) {
  //   if (localStorage.getItem(dbName)) {
  //     let todoList = JSON.parse(localStorage.getItem(dbName));
  //     todoList.push(todoObject);
  //     //console.log(todoList);
  //     localStorage.setItem(dbName, JSON.stringify(todoList));
  //   }
  localArr.push(todoObject);
}

function findTodo(todoId, dbName) {
  let index = -1;
  //   let todoList = JSON.parse(localStorage.getItem(dbName));
  //   for (let iter = 0; iter < todoList.length; iter++) {
  //     if (todoList[iter] === null) {
  //       continue;
  //     }
  //     if (todoList[iter].id === todoId) {
  //       index = iter;
  //       break;
  //     }
  //   }
  for (let iter = 0; iter < localArr.length; iter++) {
    //console.log(localArr[iter].id);
    if (localArr[iter] === null) {
      //console.log("hi");
      continue;
    }
    if (localArr[iter].id === todoId) {
      //console.log("bye");
      index = iter;
      break;
    }
  }
  return index;
}

function editTodo(newTodoValue, todoId, dbName) {
  let index = findTodo(todoId, dbName);
  //   let todoList = JSON.parse(localStorage.getItem(dbName));
  //   //console.log(index);
  //   todoList[index].Value = newTodoValue;
  //   localStorage.setItem(dbName, JSON.stringify(todoList));
  localArr[index].Value = newTodoValue;
  //console.log(localStorage.getItem(dbName));
}

function removeTodo(todoId, dbName) {
  //console.log(todoId);

  let index = findTodo(todoId, dbName);
  console.log(index);
  //   let todoList = JSON.parse(localStorage.getItem(dbName));
  //   let removedTodo = todoList.splice(index, 1)[0];
  //   localStorage.setItem(dbName, JSON.stringify(todoList));
  let removedTodo = localArr.filter((element) => {
    if (element.id !== todoId) {
      return element;
    }
  });
  localArr = removedTodo;
  //console.log(removedTodo);
  //return removedTodo;
}

function modifyTodoState(todoId, dbName) {
  let index = findTodo(todoId, dbName);
  // console.log(index);
  //   let todoList = JSON.parse(localStorage.getItem(dbName));
  //   todoList[index].isCompleted
  //     ? (todoList[index].isCompleted = false)
  //     : (todoList[index].isCompleted = true);
  //   localStorage.setItem(dbName, JSON.stringify(todoList));
  localArr[index].isCompleted
    ? (localArr[index].isCompleted = false)
    : (localArr[index].isCompleted = true);
}

export {
  createDb,
  createTodoObject,
  addTodo,
  editTodo,
  removeTodo,
  modifyTodoState,
  findTodo,
  localArr,
};
