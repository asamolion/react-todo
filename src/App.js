import React, { Component } from "react";
import "./App.css";

class Task extends Component {
  constructor(props) {
    super();
    this.state = {
      id: props.id,
      description: props.value
    };
  }

  handleClick(evt) {
    if (window.confirm('Toggle this task? \n"' + evt.target.innerHTML + '"')) {
      var temp = JSON.parse(localStorage.getItem(this.state.id));
      if (temp.status === "complete") {
        temp.status = "pending";
      } else {
        temp.status = "complete";
      }
      localStorage.setItem(this.state.id, JSON.stringify(temp));
    }
    this.props.storage();
  }

  render() {
    return (
      <li className="task">
        <a href="#" onClick={this.handleClick.bind(this)}>
          {this.state.description}
        </a>
      </li>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.getCount = this.getCount.bind(this);
    this.getTask = this.getTask.bind(this);
    this.getTaskList = this.getTaskList.bind(this);
    this.setTaskList = this.setTask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.state = {
      count: this.getCount(),
      tasks: this.getTaskList(),
      inputValue: "",
      filter: "pending"
    };
  }

  // gets a task object from localStorage
  getTask(index) {
    return JSON.parse(localStorage.getItem(+index));
  }

  getCount() {
    if (localStorage.getItem("count")) {
      return localStorage.getItem("count");
    } else {
      return 0;
    }
  }

  setCount(count) {
    localStorage.setItem("count", count);
  }

  getTaskList() {
    let tasks = [],
      count = this.getCount();
    for (let i = 0; i < count; i++) {
      var temp = this.getTask(i);
      tasks[i] = temp;
    }
    return tasks;
  }

  setTask() {
    var task = {
      id: this.state.count,
      description: this.state.inputValue,
      status: "pending"
    };
    this.setState({
      count: this.state.count + 1
    });
    this.count += 1;
    localStorage.setItem(this.state.count, JSON.stringify(task));
    localStorage.setItem("count", ++this.state.count);
  }

  handleInputChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  handleRadioChange(evt) {
    this.setState({
      filter: evt.target.value
    });
  }

  addTask() {
    this.setTask();
    this.setState({
      tasks: this.getTaskList()
    });
    document.getElementById("todoInput").value = "";
  }

  storageChange() {
    this.setState({
      tasks: this.getTaskList()
    });
  }

  render() {
    const taskList = this.state.tasks.map((task, id) => {
      if (task.status === this.state.filter || this.state.filter === "all") {
        return (
          <Task
            key={id}
            id={task.id}
            value={task.description}
            storage={this.storageChange.bind(this)}
          />
        );
      }
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2>The 10001st Todo App</h2>
        </div>
        <p className="inputField">
          <input id="todoInput" type="text" onChange={this.handleInputChange} />
          <button onClick={this.addTask}>Add Task</button>
        </p>
        <form id="filterForm">
          <input
            type="radio"
            onClick={this.handleRadioChange.bind(this)}
            name="status"
            value="pending"
            defaultChecked
          />
          <span>Pending</span>
          <input
            type="radio"
            onClick={this.handleRadioChange.bind(this)}
            name="status"
            value="complete"
          />
          <span>Completed</span>
          <input
            type="radio"
            onClick={this.handleRadioChange.bind(this)}
            name="status"
            value="all"
          />
          <span>All</span>
        </form>
        <ul>
          {taskList}
        </ul>
      </div>
    );
  }
}

// HELPER FUNCTIONS
function search(nameid, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameid) {
      return myArray[i];
    }
  }
}

export default App;
