import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import './NavBottom.css'

class NavBottom extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {navList} = this.props;
        const path = this.props.location.pathname;
        navList = navList.filter(item => !item.hide);

        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                tabBarPosition='bottom'
                style={{position: 'fixed'}}
            >
                {
                    navList.map(item=>{
                        return <TabBar.Item
                            icon={{ uri: require(`./images/${item.icon}.png`) }}
                            selectedIcon={{ uri: require(`./images/${item.icon}-selected.png`) }}
                            title={item.text}
                            key={item.path}
                            selected={item.path === path}
                            onPress={() => {
                                this.props.history.replace(item.path);
                            }}
                        />
                    })
                }
            </TabBar>
        )
    }
}

NavBottom.propTypes = {
    navList: PropTypes.array.isRequired
};

export default withRouter(NavBottom)