import React from "react";
import { Link } from "react-router";



import * as todoActions from "../actions/todoActions";


export default class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      title: ""
    }

  };

  sendTodo() {
      todoActions.sendTodo(this.state.title);
    };

  addTitle(e) {
    this.setState({title: e.target.value});
  };

  render() {

    return (
      <div className="page-body">
        <h1> Add Todo </h1>
        <fieldset className="form-group">
          <label htmlFor="name">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Enter todo title" value={this.state.title} onChange={this.addTitle.bind(this)}/>
        </fieldset>
        <button onClick={this.sendTodo.bind(this)} className="btn btn-primary">Submit Todo</button>
      </div>

    );
  }
}
