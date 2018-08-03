import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
var randomString = require('random-string');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //id: unique, name, status
      isDisplayForm: false,
      editingTaskContent: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }
  toggleTaskForm = () => {
    if (this.state.isDisplayForm && this.state.editingTaskContent) {
      this.setState({
        isDisplayForm: true,
        editingTaskContent: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        editingTaskContent: null
      });
    }

  }
  closeTaskForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }
  openTaskForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }
  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      var newData = {
        id: randomString(),
        name: data.name,
        status: data.status === 'false' ? false : true
      }
      tasks.push(newData);
    } else {
      //Editing
      var index = this.findIndex(data.id);
      tasks[index] = data
    }
    this.setState({
      tasks: tasks,
      editingTaskContent: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  updateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {

      tasks[index].status = !tasks[index].status
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  deleteItem = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.closeTaskForm();
  }
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (id === task.id) {
        result = index;
      }
    });
    return result;
  }
  editItem = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var editingTaskContent = tasks[index];
    this.setState({
      editingTaskContent: editingTaskContent
    });
    this.openTaskForm();
  }
  filterItems = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });
  }
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    });
  }
  render() {
    var {
      tasks,
      isDisplayForm,
      editingTaskContent,
      filter,
      keyword,
      sortBy,
      sortValue
    } = this.state; //var tasks = this.state.tasks
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1
        })
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }
    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if(a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      })
    } else {
      tasks.sort((a, b) => {
        if(a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      })
    }
    var elmTaskForm = isDisplayForm ?
      <TaskForm
        closeTaskForm={this.closeTaskForm}
        onSubmit={this.onSubmit}
        task={editingTaskContent}
      /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản lí công việc</h1>
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="submit"
              className="btn btn-primary mb-5"
              onClick={this.toggleTaskForm}
            ><i className="fa fa-plus mr-5"></i>
              Thêm công việc
            </button>
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  updateStatus={this.updateStatus}
                  deleteItem={this.deleteItem}
                  editItem={this.editItem}
                  filterItems={this.filterItems}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
