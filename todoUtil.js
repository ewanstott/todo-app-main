import { todoList, updateTodoList, updateItemsLeftCount } from "./entry.js";

const errorRef = document.getElementById("error");

//add Todo
export const addTodo = (todo, errorRef, todoRef) => {
  // Defensive checks
  // Validate user input
  if (!todo) {
    errorRef.innerHTML = "Please type in your Todo item to add!";
    // Checks for an empty string i.e., if nothing in todo, return
    return;
  }

  //check no duplicates
  const duplicate = todoList.some((item) => {
    return item.title === todo;
  });
  //if duplicate true, return
  if (duplicate) {
    errorRef.innerHTML = "You already added this item!";
    return;
  }

  errorRef.innerHTML = ""; //resets dom error message
  todoList.unshift({ id: Math.random(), title: todo, done: false }); //add item to todoList array
  updateTodoList(); //update DOM
  updateItemsLeftCount();
  todoRef.value = ""; //clears input field
};
