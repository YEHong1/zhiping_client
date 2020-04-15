import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import BossInfo from "../BossInfo/BossInfo";
import JobHunterInfo from "../JobHunterInfo/JobHunterInfo";
import Boss from "../Boss/Boss";
import JobHunter from "../JobHunter/JobHunter";
import Message from "../Message/Message";
import Mine from "../Mine/Mine";
import NotFount from "../NotFount/NotFount";
import NavBottom from "../../Componments/NavBottom/NavBottom";
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; // 操作cookie set/get/remove
import {getRedirectPath} from "../../utils";
import {getUserInfo} from "../../redux/actionCreator";
import {NavBar} from "antd-mobile";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.navList = [ // 包含所有导航组件的相关信息数据
            {
                path: '/boss', // 路由路径
                component: Boss,
                title: '求职者列表',
                icon: 'boss',
                text: '招人',
            },
            {
                path: '/jobHunter', // 路由路径
                component: JobHunter,
                title: '招聘者列表',
                icon: 'jobHunter',
                text: '找工作',
            },
            {
                path: '/message', // 路由路径
                component: Message,
                title: '消息列表',
                icon: 'message',
                text: '消息',
            },
            {
                path: '/mine', // 路由路径
                component: Mine,
                title: '用户中心',
                icon: 'mine',
                text: '个人',
            }
        ]
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


        const {navList} = this;
        //获取当前的路由路径
        const path = this.props.location.pathname;
        // 获取当前的nav
        const currentNav = navList.find(item => item.path === path);
        if(currentNav){
            // 隐藏不符合身份类型的nav
            if(user.type === 'boss'){
                navList[1].hide = true;
            }else {
                navList[0].hide = true;
            }
        }

        return (
            <div style={{minHeight: '100%'}}>
                {
                    currentNav ? <NavBar style={{position: 'fixed', top: 0, width: '100%', zIndex: 999}}>{currentNav.title}</NavBar> : null
                }
                <Switch>
                    <Route path='/bossInfo' component={BossInfo}/>
                    <Route path='/jobHunterInfo' component={JobHunterInfo}/>
                    <Route path='/boss' component={Boss}/>
                    <Route path='/jobHunter' component={JobHunter}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/mine' component={Mine}/>
                    <Route component={NotFount}/>
                </Switch>
                {
                    currentNav ? <NavBottom navList={navList}/> : null
                }
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