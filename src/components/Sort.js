import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.sort_item_dispatch(sortBy, sortValue);
  }
  render() {
    const { sortBy, sortValue } = this.props;
    return (
      <div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="row">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Sắp xếp
                      <span className="caret ml-5" /></button>
              <ul className="dropdown-menu">
                <li onClick={() => this.onClick('name', 1)}>
                  <a role="button">
                    Tên A-Z
                    <i className={(sortBy === 'name' && sortValue === 1)
                      ? "fas fa-check" : ""}>
                    </i>
                  </a>
                </li>
                <li onClick={() => this.onClick('name', -1)}>
                  <a role="button">
                    Tên Z-A
                    <i className={(sortBy === 'name' && sortValue === -1)
                      ? "fas fa-check" : ""}>
                    </i>
                  </a>
                </li>
                <hr />
                <li onClick={() => this.onClick('status', 1)}>
                  <a role="button">
                    Trạng thái kích hoạt
                    <i className={(sortBy === 'status' && sortValue === 1)
                      ? "fas fa-check" : ""}>
                    </i>
                  </a>
                </li>
                <li onClick={() => this.onClick('status', -1)}>
                  <a role="button">
                    Trạng thái ẩn
                    <i className={(sortBy === 'status' && sortValue === -1)
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

const mapStateToProps = state => {
  return {
    sortBy: state.sort_item.sortBy,
    sortValue: state.sort_item.sortValue
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    sort_item_dispatch: (sortBy, sortValue) => {
      dispatch(actions.sort_item_action(sortBy, sortValue));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
