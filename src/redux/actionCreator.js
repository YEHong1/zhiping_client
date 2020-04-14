import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from "./action-types";
import {reqRegister, reqLogin, reqUpdateUser, reqUserInfo} from "../api";

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
// 错误提示信息的同步action
export const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
//接收用户信息的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
//重置用户信息的同步action
const resetUser = (msg) => ({type: RESET_USER, data: msg});

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

// 更新用户信息的异步action
export const updateUser = (user)=>{
    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;
        if(result.code === 1){
            // 更新失败，重置与用户信息，并跳转到登录界面
            dispatch(resetUser(result.msg));
        }else {
            // 更新成功
            dispatch(receiveUser(result.data));
        }
    }
};

// 通过cookie获取用户信息的异步action
export const getUserInfo = () => {
    return async dispatch => {
        const response = await reqUserInfo();
        const result = response.data;
        if(result.code === 0){
            dispatch(receiveUser(result.data));
        }else {
            dispatch(resetUser(result.msg));
        }
    }
};