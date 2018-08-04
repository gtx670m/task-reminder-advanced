import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Control from './Control';

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
    this.props.close_task_form_dispatch();
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
    this.props.add_item_dispatch(this.state);
    this.props.close_task_form_dispatch();
  }
  clearForm = () => {
    this.setState({
      name: '',
      status: false
    })
  }
  render() {
    if (!this.props.toggle_task_form) return '';
    return (
      <div>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.props.editing_data.id ? "Sửa công việc" : "Thêm công việc"}
              <span
                className="fa fa-times-circle text-right"
                onClick={this.closeTaskForm}
              ></span>
            </h3>
          </div>
          <div className="panel-body">
            <form
              onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên: </label>
                <input
                  type="text" className="form-control" placeholder="Task name"
                  name="name"
                  value={this.props.editing_data.name}
                  onChange={this.onChange}
                />
                <label>Trạng thái: </label>
                <select
                  className="form-control"
                  required="required"
                  name="status"
                  value={this.props.editing_data.status}
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


const mapStateToProps = state => {
  console.log(state);
  return {
    toggle_task_form: state.toggle_task_form,
    editing_data: state.editing_data
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    add_item_dispatch: (task) => {
      dispatch(actions.add_item_action(task));
    },
    close_task_form_dispatch: () => {
      dispatch(actions.close_task_form());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
