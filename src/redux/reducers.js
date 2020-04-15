import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST} from "./action-types";
import {getRedirectPath} from "../utils";

const initUser = {
    username: '', // 用户名
    type: '',     //用户类型
    msg: '',      // 错误提示信息
    redireactPath: '' //需要重定向的路径
};
// 用户信息的reducer
function user (state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            // 这个先把state里的数据取出来，再用action.data来覆盖前面对象中相同的属性名的属性值
            const {type, header} = action.data;
            return {...state, ...action.data, redireactPath: getRedirectPath(type, header)};
        case ERROR_MSG:
            return {...state, msg: action.data};
        case RECEIVE_USER:
            return {...state, ...action.data};
        case RESET_USER:
            return {...initUser, msg: action.data};
        default:
            return state
    }
}

// 用户列表的reducer
function userList(state = [], action) {
    if (action.type === RECEIVE_USER_LIST) {
        return action.data;
    } else {
        return state
    }
}


export default combineReducers({
    user,
    userList
})