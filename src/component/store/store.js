import {createStore} from 'redux';

const initState = {
    mode : true,
    board_Data : [],
    count_List : [],
}

export default createStore(function(state = initState, action) {
    if(action.type === "boardList"){
        console.log("...state",state);
        return {...state, board_Data:action.board_Data}
    }
    if(action.type === "countList"){
        console.log("...state",state);
        return {...state, count_List:action.count_List}
    }
    if(action.type === "ModeConverter"){
        if(state.mode === true){
            return {...state, mode:!state.mode}
        }
        return {...state, mode:!state.mode}
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());