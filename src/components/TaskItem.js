import React, { Component } from 'react';

class TaskItem extends Component {
  toggleStatus = () => {
    this.props.toggleStatus(this.props.task.id);
  }
  deleteItem = () => {
    this.props.deleteItem(this.props.task.id);
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
            className={task.status === true ? "label label-success" : "label label-danger"}
            onClick={this.toggleStatus}
          >{(task.status === true) ? "Kích Hoạt" : "Hủy"}
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

export default TaskItem;
