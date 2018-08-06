import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1 //all: -1, active: 1, deactive: 0
    }
  }
  editItem = (id) => {
    this.props.editItem(id);
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.filterItems(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus,
    );
    this.setState({
      [name]: value
    });
    this.props.filter_list_dispatch(this.state);
  }
  render() {
    var { tasks } = this.props;
    // var tasks = this.props.tasks;
    var { filterName, filterStatus } = this.state;
    var elmTask = tasks.map((task, index) => {
      return (
        <TaskItem key={task.id} task={task} index={index}/>
      )
    });
    return (
      <div>
        <table className="table table-bordered table-hover mt-15">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Alarm</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text" className="form-control" placeholder="filter here"
                  name="filterName"
                  value={filterName}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  required="required"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChange}
                >
                  <option value={-1}>All</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTask}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  } 
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    filter_list_dispatch: (data) => {
      dispatch(actions.filter_list_action(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
