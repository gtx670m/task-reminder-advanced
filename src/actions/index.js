import * as types from '../constants/ActionTypes';

export const show_list_action = () => {
    return {
        type: types.SHOW_LIST
    }
}

export const save_item_action = (task) => {
    return {
        type: types.SAVE_ITEM,
        task: task
    }
}
export const toggle_task_form = () => {
    return {
        type: types.TOGGLE_TASK_FORM,
    }
}
export const open_task_form = () => {
    return {
        type: types.OPEN_TASK_FORM,
    }
}
export const close_task_form = () => {
    return {
        type: types.CLOSE_TASK_FORM,
    }
}
export const toggle_task_status_action = (id) => {
    return {
        type: types.TOGGLE_TASK_STATUS,
        id
    }
}
export const delete_item_action = (id) => {
    return {
        type: types.DELETE_ITEM,
        id
    }
}
export const edit_item_action = (task) => {
    return {
        type: types.EDIT_ITEM,
        task
    }
}

export const clear_editing_data_action = () => {
    return{
        type:types.CLEAR_EDITING_DATA,
    }
}

export const filter_list_action = (data) => {
    return {
        type:types.FILTER_LIST,
        data
    }
}