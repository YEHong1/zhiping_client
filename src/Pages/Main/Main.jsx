import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import BossInfo from "../BossInfo/BossInfo";
import JobHunterInfo from "../JobHunterInfo/JobHunterInfo";
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; // 操作cookie set/get/remove
import {getRedirectPath} from "../../utils";
import {getUserInfo} from "../../redux/actionCreator";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // 1.获取cookie中userid
        const userid = Cookies.get('userid');
        // 2.获取redux管理的user的_id
        const {_id} = this.props.user;
        // 3.如果cookie中存在userid并且redux管理的user数据中没有_id属性时，表示用户曾经登录过，但现在未登录，将执行自动登录
        if(userid && !_id){
            this.props.getUserInfo();
        }

    }

    render() {

        // 读取cookie中的userid
        const userid = Cookies.get('userid');
        // 如果没有, 自动重定向到登陆界面
        if(!userid) {
            return <Redirect to='/login'/>
        }
        // 如果有,读取redux中的user状态
        const {user} = this.props;
        // 如果user有没有_id, 返回null(不做任何显示)
        if(!user['_id']){
            return null
        }else {
            // 如果有_id, 显示对应的界面
            // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
            let path = this.props.location.pathname;
            if(path === '/'){
                // 得到一个重定向的路由路径
                path = getRedirectPath(user.type, user.header);
                return <Redirect to= {path}/>
            }
        }



        return (
            <div>
                <Switch>
                    <Route path='/bossInfo' component={BossInfo}/>
                    <Route path='/jobHunterInfo' component={JobHunterInfo}/>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUserInfo}
)(Main);

/*
* 1.自动登录功能
*   1.componentDidMount()
*     曾经登录过，cookie中存在userid, 但redux中没有user的数据，取发送请求获取用户数据
*   2.render()
*       1)如果cookie中没有userid，直接重定向到login界面
*       2)判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
*       3）redux管理的user中是存在_id时，显示对应的界面
*       4）如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
* */