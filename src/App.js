import React, { Component } from 'react';
import './App.scss';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  toggleTaskForm = () => {
    if (this.props.editing_data.id) {
      this.props.clear_editing_data_dispatch();
    } else {
      this.props.toggle_task_form_dispatch();
      this.props.clear_editing_data_dispatch();
    }
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
    var { toggle_task_form } = this.props;
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
            <Control />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
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
