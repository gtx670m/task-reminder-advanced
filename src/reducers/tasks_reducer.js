import * as types from '../constants/ActionTypes';
var randomString = require('random-string');
var localData = JSON.parse(localStorage.getItem('tasks'));
var initialState = localData ? localData : [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LIST:
            return state;
        case types.ADD_ITEM:
            const { name, status } = action.task;
            var newItem = {
                id: randomString(),
                name: name,
                status: status === "false" ? false : true
            }
            state.push(newItem);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.TOGGLE_TASK_STATUS:
            var index = state.findIndex((state) => {
                return action.id === state.id;
            })
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_ITEM:
            var index = state.findIndex((state, id) => {
                return action.id === state.id;
            });
            // state = state.splice(index, 1);
            console.log(state);
            // localStorage.setItem('tasks', JSON.stringify(state));
            // console.log(index, state[index]);
        // if (index !== -1) {
        //   tasks.splice(index, 1);
        //   this.setState({
        //     tasks: tasks
        //   });
        //   localStorage.setItem('tasks', JSON.stringify(tasks));
        // }
        // this.closeTaskForm();

        default: return state;
    }
};

export default myReducer;
