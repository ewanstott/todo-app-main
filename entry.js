// import { todoList } from "./js/todoList.js";
import { addTodo } from "./todoUtil.js";

let todo = "";
let completedTodos = [];
let activeTodos = [];

//DOM refs
const todoListRef = document.getElementById("todoList");
const todoRef = document.getElementById("todo");
const addRef = document.getElementById("add");
const errorRef = document.getElementById("error");
// const sortByCompleted = document.getElementById("sortByCompleted");
// const sortByActive = document.getElementById("sortByActive");
const completedRef = document.getElementById("completed");
const activeRef = document.getElementById("active");
const allRef = document.getElementById("showAll");
const deleteRef = document.getElementById("delete-btn");

//todos aka todoList

export let todoList = [
  { id: 1, title: "80km cycle", done: false },
  { id: 2, title: "Buy cheese", done: true },
  { id: 3, title: "Book flights", done: false },
  { id: 4, title: "New house research", done: false },
];

//toggles done / undone
const toggleDone = (id) => {
  console.log(id);
  const index = todoList.findIndex((todo) => {
    return todo.id === id;
  });
  todoList[index].done = !todoList[index].done;
  updateTodoList();
};

//completed only

//sortByCompleted
// sortByCompleted.addEventListener("click", () => {
//   todoList.sort((a, b) => {
//     if (a.done) {
//       //if a is done, return true. If 1st one is true, move forwards
//       return -1;
//     } else {
//       // else, move backwards
//       return 1;
//     }
//   });
//   updateTodoList();
// });

// //sortByActive
// sortByActive.addEventListener("click", () => {
//   todoList.sort((a, b) => {
//     if (!a.done) {
//       //if a is done, return true. If 1st one is true, move forwards
//       return -1;
//     } else {
//       // else, move backwards
//       return 1;
//     }
//   });
//   updateTodoList();
// });

//Event Listeners

//FUNCTIONS TO FILTER COMPLETED/ACTIVE/ALL
//Listens for click on completed button
completedRef.addEventListener("click", () => {
  completedTodos = todoList.filter((todo) => todo.done);
  updateTodoList(completedTodos);
  console.log(completedTodos);
});

//Listens for click on active button
activeRef.addEventListener("click", () => {
  activeTodos = todoList.filter((todo) => !todo.done);
  updateTodoList(activeTodos);
  console.log(activeTodos);
});

// Event listener for the "Show All" button
allRef.addEventListener("click", () => {
  updateTodoList(todoList);
  console.log(todoList);
});
//FUNCTIONS TO FILTER COMPLETED/ACTIVE/ALL^^^

//Listens for a click on a todo
todoListRef.addEventListener("click", (e) => {
  toggleDone(Number(e.target.id));
});

//Listens for Todo input
todoRef.addEventListener("input", (e) => {
  todo = e.target.value;
});

//Listen for "Enter" key press
todoRef.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo(todo, errorRef, todoRef);
  }
});

// //Listen for delete button
todoListRef.addEventListener("click", (e) => {
  //if clicked element class contain delete-btn
  if (e.target.classList.contains("delete-btn")) {
    //get ID
    const todoId = Number(e.target.id);
    //delete
    deleteTodo(todoId);
  }
});

function deleteTodo(id) {
  // Filter out the todo with the specified id
  todoList = todoList.filter((todo) => todo.id !== id);
  updateTodoList();
}

export const updateTodoList = (filteredTodos) => {
  const todosToDisplay = filteredTodos || todoList;
  const html = todosToDisplay.map((todo) => {
    return `<li id=${todo.id} class="list ${
      todo.done ? "done" : "undone"
    }"> <i class="far fa-circle"></i> ${
      todo.title
    }<button class="delete-btn" id="${todo.id}">X</button></li>`;
  });
  todoListRef.innerHTML = html.join("");
};
updateTodoList();
