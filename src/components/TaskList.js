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
    var filter = {
      filterName: name === 'filterName' ? value : this.state.filterName,
      filterStatus: name === 'filterStatus' ? value : this.state.filterStatus
    }
    this.props.filter_list_dispatch(filter);
    this.setState({
      [name]: value
    });

  }
  render() {
    var { tasks, keyword, sortBy, sortValue } = this.props;
    var { filterName, filterStatus } = this.props.filter_list;
    if (filterName) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
      });
    }

    tasks = tasks.filter((task) => {
      if (filterStatus === -1) {
        return task;
      }
      else {
        return task.status === (filterStatus === 1 ?
          true : false);
      }
    })

    tasks = tasks.filter((task) => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    })

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

    var elmTask = tasks.map((task, index) => {
      return (
        <TaskItem key={task.id} task={task} index={index} />
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
    filter_list: state.filter_list,
    keyword: state.search_item.keyword,
    sortBy: state.sort_item.sortBy,
    sortValue: state.sort_item.sortValue
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    filter_list_dispatch: (filter) => {
      dispatch(actions.filter_list_action(filter));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
