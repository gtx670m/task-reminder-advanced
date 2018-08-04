import { combineReducers } from 'redux';
import tasks from '../reducers/tasks_reducer';
import toggle_task_form from '../reducers/toggle_task_form_reducer';
import editing_data from '../reducers/editing_reducer';

const myReducer = combineReducers({
    tasks,
    toggle_task_form,
    editing_data
});

export default myReducer;