/*
* 注册成功后，路由跳转有4种情况
* 1.type为boss, 跳转到boss对应的界面 /boss
* 2.type为jobHunter， 跳转到求职者对应的界面 /jobHunter
* 3.type为boss且没有头像信息， 跳转到boss的信息完善界面 /bossInfo
* 4.type为jobHunter且没有头像信息， 跳转到求职者的信息完善界面 /jobHunterInfo
* */
export function getRedirectPath(type, header) {
    let path = '';
    if(type === 'boss'){
        path = '/boss'
    }else {
        path = '/jobHunter'
    }

    if(!header){
        path += 'Info'
    }

    return path
}