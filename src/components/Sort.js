import React, { Component } from 'react';

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
  }
  render() {
    return (
      <div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="row">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Sắp xếp
                      <span className="caret" /></button>
              <ul className="dropdown-menu">
                <li onClick={() => this.onClick('name', 1)}>
                  <a role="button">
                    Tên A-Z
                    <i className={(this.props.sortBy === 'name' && this.props.sortValue === 1)
                      ? "fas fa-check" : ""}>
                    </i>
                  </a>
                </li>
                <li onClick={() => this.onClick('name', -1)}>
                  <a role="button">
                    Tên Z-A
                    <i className={(this.props.sortBy === 'name' && this.props.sortValue === -1)
                      ? "fas fa-check" : ""}>
                    </i>
                  </a>
                </li>
                <hr />
                <li onClick={() => this.onClick('status', 1)}>
                  <a role="button">
                    Trạng thái kích hoạt
                    <i className={(this.props.sortBy === 'status' && this.props.sortValue === 1)
                      ? "fas fa-check" : ""}>
                    </i>
                  </a>
                </li>
                <li onClick={() => this.onClick('status', -1)}>
                  <a role="button">
                    Trạng thái ẩn
                    <i className={(this.props.sortBy === 'status' && this.props.sortValue === -1)
                      ? "fas fa-check" : ""}>
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sort;
