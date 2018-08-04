import * as types from '../constants/ActionTypes';
// var editingData = JSON.parse(localStorage.getItem('editing_data'));
// var initialState = editingData ? editingData : [];
var initialState = {};
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_ITEM:
            return action.task;
        default: return state;
    }
};

export default myReducer;
