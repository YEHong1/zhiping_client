import {combineReducers} from "redux";

function count (state=0, action) {
    return state
}

function num (state=0, action) {
    return state
}

export default combineReducers({
    count,
    num
})