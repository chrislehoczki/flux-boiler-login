import React from "react";

import todoStore from "../stores/todoStore.js";
import Todo from "../components/Todo.js"
export default class Featured extends React.Component {


	constructor() {
		super();
		this.state = {
			todos: todoStore.getAll()
		}

		this.getTodos = this.getTodos.bind(this);

	};

	componentWillMount() {
		console.log("this is beginning state", this.state)
		todoStore.on("change", this.getTodos);
	};

	componentWillUnmount() {
		todoStore.removeListener("change", this.getTodos);
	};

	getTodos() {
		this.setState({
			todos: todoStore.getAll()
		});
	};

  	render() {
	  	
	  	const todoComponents = this.state.todos.map(function(todo) {
	  		return <Todo key={todo._id} title={todo.title} _id={todo._id} complete={todo.complete} />
	  	});


	    return (
	      <div className="page-body">
	        <h1>Home</h1>
	        {todoComponents}
	      </div>
	    );
	  }
}
