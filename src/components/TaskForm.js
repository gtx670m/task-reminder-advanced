import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: true
    }
  }
  componentWillMount() {
    var { task } = this.props;
    if (this.props.task) {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    var { task } = nextProps;
    if (nextProps && nextProps.task) {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    } else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: true
      });
    }
  }

  closeTaskForm = () => {
    this.props.closeTaskForm();
  }
  onChange = (event) => {
    var target = event.target; //trỏ đến các ô input
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.props.closeTaskForm();
  }
  clearForm = () => {
    this.setState({
      name: '',
      status: false
    })
  }
  render() {
    return (
      <div>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.id ? "Sửa công việc" : "Thêm công việc"}
              <span
                className="fa fa-times-circle text-right"
                onClick={this.closeTaskForm}
              ></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên: </label>
                <input
                  type="text" className="form-control" placeholder="type here"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <label>Trạng thái: </label>
                <select
                  className="form-control"
                  required="required"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value={true}>Kích Hoạt</option>
                  <option value={false}>Hủy</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-warning mr-5">
                <i className="fa fa-plus mr-5"></i>
                Lưu lại
                </button>&nbsp;
              <button
                type="button"
                className="btn btn-danger mr-5"
                onClick={this.clearForm}
              ><i className="fa fa-times mr-5"></i>
                Hủy bỏ
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
