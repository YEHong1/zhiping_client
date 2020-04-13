import ajax from "./ajax";

// 注册
export const reqRegister = (user)=>ajax('/register', user, 'POST');

// 登录
export const reqLogin = (user)=>ajax('/login', user, 'POST');