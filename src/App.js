import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class Task extends Component {}

class App extends Component {
  

  constructor() {
    super();
    this.getTaskList = this.getTaskList.bind(this);
    this.setTaskList = this.setTaskList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.state = {
      tasks: this.getTaskList(),
      inputValue: ""
    };
  }

  getTaskList() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks ? tasks : [];
  }

  setTaskList(task) {
    if (!task) {
      return;
    }
    this.state.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  addTask() {
    this.setTaskList(this.state.inputValue);
    this.setState({
      tasks: this.getTaskList()
    });
  }

  render() {
    const taskList = this.state.tasks.map((task) => 
      <li>{ task }</li>
    );
    return (
      <div className="App">
        <div className="App-header">
          <h2>The 10001st Todo App</h2>
        </div>
        <p className="inputField">
          <input type="text" onChange={this.handleChange} />
          <button onClick={this.addTask}>Add Task</button>
        </p>
        <ul>
          {taskList}
        </ul>
      </div>
    );
  }
}

export default App;
