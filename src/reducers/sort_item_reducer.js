import * as types from '../constants/ActionTypes';

var initialState = {
    sortBy: 'name',
    sortValue: 1
};
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT_ITEM:
            return {
                sortBy: action.sortBy,
                sortValue: action.sortValue
            };
        default: return state;
    }
};

export default myReducer;
