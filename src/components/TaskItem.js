import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
  toggleStatus = () => {
    this.props.toggle_task_status(this.props.task.id);
  }
  deleteItem = () => {
    this.props.delete_item_dispatch(this.props.task.id);
  }
  editItem = () => {
    this.props.editItem(this.props.task.id);
  }
  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={this.props.task.status === true ? "label label-success" : "label label-danger"}
            onClick={this.toggleStatus}
          >{(this.props.task.status === true) ? "Kích Hoạt" : "Hủy"}
          </span>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.editItem}
          >
            <i className="fas fa-pencil-alt mr-5">
            </i>
            Sửa
          </button>&nbsp;
          <button
            type="button" className="btn btn-danger"
            onClick={this.deleteItem}
          >
            <i className="fa fa-trash mr-5">
            </i>
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    toggle_task_status: (id) => {
      dispatch(actions.toggle_task_status_action(id));
    },
    delete_item_dispatch: (id) => {
      dispatch(actions.delete_item_action(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);