import { combineReducers } from 'redux';
import tasks from '../reducers/tasks_reducer';
import toggle_task_form from '../reducers/toggle_task_form_reducer';
import editing_data from '../reducers/editing_reducer';
import filter_list from '../reducers/filter_reducer';
import search_item from '../reducers/search_item_reducer';
import sort_item from '../reducers/sort_item_reducer';
const myReducer = combineReducers({
    tasks,
    toggle_task_form,
    editing_data,
    filter_list,
    search_item,
    sort_item
});

export default myReducer;