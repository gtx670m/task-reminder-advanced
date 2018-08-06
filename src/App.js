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
    if (this.props.editing_data.id) {
      this.props.clear_editing_data_dispatch();
    } else {
      this.props.toggle_task_form_dispatch();
      this.props.clear_editing_data_dispatch();
    }
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
      filter,
      // keyword,
      sortBy,
      sortValue
    } = this.state; //var tasks = this.state.tasks

    var { toggle_task_form } = this.props;

    // if (keyword) {S
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

    // var elmTaskForm = toggle_task_form ?
    //   <TaskForm
    //     closeTaskForm={this.closeTaskForm}
    //     task={editingTaskContent}
    //   /> : '';

    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Reminder</h1>
        </div>
        <div className="row">
          <div className={toggle_task_form ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            <TaskForm />
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
    tasks: state,
    editing_data: state.editing_data
  };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    toggle_task_form_dispatch: () => {
      dispatch(actions.toggle_task_form());
    },
    clear_editing_data_dispatch: () => {
      dispatch(actions.clear_editing_data_action());
    },
    filter_list_dispatch: (data) => {
      dispatch(actions.filter_list_action(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
