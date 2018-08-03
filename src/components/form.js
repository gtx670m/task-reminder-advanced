import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      description: '',
      gender: 0,
      language: 'en',
      status: true
    }
  }
  saveData = (event) => {
    var target = event.target; //trỏ đến các ô input
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = (event) => {
    event.preventDefault(); //chặn submit như mặc định
    console.log(this.state);
  }
  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Panel title</h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    {/* textBox //////////////////////////////////////////////////////////////////////////////////// */}
                    <label>Username: </label>
                    <input
                      type="text" className="form-control" placeholder="type here"
                      name="userName"
                      onChange={this.saveData}
                      value={this.state.userName} />

                    <label>Password: </label>
                    <input
                      type="text" className="form-control" placeholder="type here"
                      name="passWord"
                      onChange={this.saveData}
                      value={this.state.passWord} />
                    {/* textArea //////////////////////////////////////////////////////////////////////////////////// */}
                    <label>Mô tả: </label>
                    <textarea id="input"
                      className="form-control"
                      rows="3"
                      name="description"
                      placeholder="type here"
                      onChange={this.saveData}
                      value={this.state.description}
                    ></textarea>
                    {/* selectBox //////////////////////////////////////////////////////////////////////////////////// */}
                    <label>Giới tính: </label>
                    <select
                      className="form-control"
                      required="required"
                      name="gender"
                      onChange={this.saveData}
                      value={this.state.gender}>
                      <option value={0}>Nữ</option>
                      <option value={1}>Nam</option>
                    </select>
                    {/* radioButton //////////////////////////////////////////////////////////////////////////////////// */}
                    <label>Ngôn ngữ: </label>
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="language"
                          value="vn"
                          onChange={this.saveData} />
                        Tiếng Việt
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="language"
                          value="en"
                          onChange={this.saveData}
                          defaultChecked="checked" />
                        Tiếng Anh
                      </label>
                    </div>
                    {/* checkBox //////////////////////////////////////////////////////////////////////////////////// */}
                    <label>Trạng thái: </label>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="status"
                          value={true}
                          onChange={this.saveData}
                          checked={this.state.status === true} />
                        Checkbox
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                  <button type="reset" className="btn btn-default">Clear</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
