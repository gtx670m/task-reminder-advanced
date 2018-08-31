import * as types from '../constants/ActionTypes';

var initialState = {
    keyword: '',
};
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_ITEM:
            const { keyword } = action;
            return {
                keyword: keyword.toLowerCase()
            };
        default: return state;
    }
};

export default myReducer;
