import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super();
    
  };

  getAll() {
    return this.items;
  };
  
  addTodo(todo) {
    this.items.push(todo);
    this.emit("change");
  };

 handleActions(action) {
    switch(action.type) {
      case "ADDED_TODO": {
        this.addTodo(action.todo);
        break;
      }
      case "UPDATE_TODOS": {
        this.items = action.todos;
        console.log("this is new state after calling update items", this.items)
        this.emit("change");
        break;
      }
      case "INITIATE_TODOS": {
        this.items = action.todos;
        break;
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));


export default todoStore;