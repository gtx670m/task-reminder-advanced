import * as types from '../constants/ActionTypes';
// var editingData = JSON.parse(localStorage.getItem('editing_data'));
// var initialState = editingData ? editingData : [];
var initialState = {
    id: '',
    name: '',
    status: false
};
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_ITEM:
            return action.task;
        case types.CLEAR_EDITING_DATA:
            state = {
                id: '',
                name: '',
                status: true
            }       
        default: return state;
    }
};

export default myReducer;
