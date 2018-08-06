import * as types from '../constants/ActionTypes';
var randomString = require('random-string');
var localData = JSON.parse(localStorage.getItem('tasks'));
var initialState = localData ? localData : [];

var myReducer = (state = initialState, action) => {
    var index;
    switch (action.type) {
        case types.SHOW_LIST:
            return state;
        /////////////////////////////////////////////////////////
        case types.SAVE_ITEM:
            const { id, name, status } = action.task;
            var newItem = {
                id: id,
                name: name,
                status: status === "false" ? false : true
            }
            if (!newItem.id) {
                newItem = {
                    id: randomString(),
                    name: name,
                    status: status === "false" ? false : true
                }
                state.push(newItem);
            } else {
                index = state.findIndex((state) => {
                    return id === state.id;
                })
                state[index] = newItem;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        /////////////////////////////////////////////////////////
        case types.TOGGLE_TASK_STATUS:
            index = state.findIndex((state) => {
                return action.id === state.id;
            })
            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    status: !state[index].status
                }
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        /////////////////////////////////////////////////////////
        case types.DELETE_ITEM:
            index = state.findIndex((state) => {
                return action.id === state.id;
            });
            if (index !== -1) {
                state.splice(index, 1);
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]
        /////////////////////////////////////////////
        case types.FILTER_LIST:
        console.log(action);
            if (action) {
                if (action.name) {
                    
                    state = state.filter((state) => {
                        return state.name.toLowerCase().indexOf(action.name.toLowerCase()) !== -1
                    });
                }
                // state = state.filter((state) => {
                //     if (state.status === -1) {
                //         return state;
                //     } else {
                //         return state.status === (action.status === 1 ? true : false)
                //     }
                // });
            }
            return [...state]
        default: return state;
    }
};

export default myReducer;
