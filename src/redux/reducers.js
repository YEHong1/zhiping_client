import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";

const initUser = {
    username: '', // 用户名
    type: '',     //用户类型
    msg: '',      // 错误提示信息
    redireactPath: '' //需要重定向的路径
};

function user (state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            // 这个先把state里的数据取出来，再用action.data来覆盖前面对象中相同的属性名的属性值
            return {...state, ...action.data, redireactPath: '/'};
        case ERROR_MSG:
            return {...state, msg: action.data};
        default:
            return state
    }
}


export default combineReducers({
    user
})