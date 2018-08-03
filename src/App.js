import React, { Component } from 'react';
import './App.scss';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  toggleTaskForm = () => {
    // if (this.state.isDisplayForm && this.state.editingTaskContent) {
    //   this.setState({
    //     isDisplayForm: true,
    //     editingTaskContent: null
    //   });
    // } else {
    //   this.setState({
    //     isDisplayForm: !this.state.isDisplayForm,
    //     editingTaskContent: null
    //   });
    // }
    this.props.toggle_task_form_dispatch();
  }

  // findIndex = (id) => {
  //   var { tasks } = this.state;
  //   var result = -1;
  //   tasks.forEach((task, index) => {
  //     if (id === task.id) {
  //       result = index;
  //     }
  //   });
  //   return result;
  // }
  editItem = (id) => {
    var { tasks } = this.state;
    var index = tasks.findIndex((task, id) => {
      return task.id === id;
    });
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
      editingTaskContent,
      // filter,
      // keyword,
      sortBy,
      sortValue
    } = this.state; //var tasks = this.state.tasks

    var { toggle_task_form } = this.props;
    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1
    //     })
    //   }
    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filter.status === 1 ? true : false)
    //     }
    //   });
    // }
    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1
    //   })
    // }
    // if (sortBy === 'name') {
    //   tasks.sort((a, b) => {
    //     if(a.name > b.name) return sortValue;
    //     else if (a.name < b.name) return -sortValue;
    //     else return 0;
    //   })
    // } else {
    //   tasks.sort((a, b) => {
    //     if(a.status > b.status) return -sortValue;
    //     else if (a.status < b.status) return sortValue;
    //     else return 0;
    //   })
    // }
    var elmTaskForm = toggle_task_form ?
      <TaskForm
        closeTaskForm={this.closeTaskForm}

        task={editingTaskContent}
      /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Reminder</h1>
        </div>
        <div className="row">
          <div className={toggle_task_form ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {elmTaskForm}
          </div>
          <div className={toggle_task_form ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="submit"
              className="btn btn-primary mb-5"
              onClick={this.toggleTaskForm}
            ><i className="fa fa-plus mr-5"></i>
              Add new Task
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

const mapStateToProps = state => {
  return {
    toggle_task_form: state.toggle_task_form,
    tasks: state
  };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    toggle_task_form_dispatch: () => {
      dispatch(actions.toggle_task_form());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
