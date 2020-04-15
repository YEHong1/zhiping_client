import ajax from "./ajax";

// 注册
export const reqRegister = (user) => ajax('/register', user, 'POST');

// 登录
export const reqLogin = (user) => ajax('/login', user, 'POST');

// 更新用户数据
export const reqUpdateUser = (user) => ajax('/update', user, 'POST');

// 通过cookie获取用户信息
export const reqUserInfo = () => ajax('/getUserInfo');

// 获取用户列表
export const reqUserList = (type) => ajax('/getUserList', {type});