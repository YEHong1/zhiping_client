import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";
import {reqRegister, reqLogin} from "../api";

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
// 错误提示信息的同步action
export const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

// 注册的异步action
export const register = (user)=>{
    const {username, password, passwordAgain, type} = user;
    // 前台校验
    if(!username || !password || !passwordAgain){
        return errorMsg('用户名或密码不能为空')
    }else if(password !== passwordAgain){
        return errorMsg('两次输入的密码不一致')
    }

    return async dispatch => {
        const response = await reqRegister({username, password, type});
        const result = response.data;
        if(result.code === 0){
            // 成功
            dispatch(authSuccess(result.data))
        }else {
            // 失败
            dispatch(errorMsg(result.msg))
        }
    }
};

// 登录的异步action
export const login = (user)=>{
    const {username, password} = user;
    // 前台校验
    if(!username || !password){
        return errorMsg('用户名或密码不能为空')
    }

    return async dispatch => {
        const response = await reqLogin({username, password});
        const result = response.data;
        if(result.code === 0){
            // 成功
            dispatch(authSuccess(result.data))
        }else {
            // 失败
            dispatch(errorMsg(result.msg))
        }
    }
};