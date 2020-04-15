import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from "antd-mobile";
const Header = Card.Header;
const Body = Card.Body;

export default class UserList extends Component {

    render() {
        const {userList} = this.props;
        console.log(userList);
        return (
            <WingBlank style={{marginBottom:60, marginTop: 50}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <Header
                                    thumb={require(`../../assets/images/${user.header}.png`)}
                                    extra={user.username}
                                />
                                <Body>
                                    <div style={{padding: '5px 0'}}>职位: {user.post}</div>
                                    {user.company ? <div style={{padding: '5px 0'}}>公司: {user.company}</div> : null}
                                    {user.salary ? <div style={{padding: '5px 0'}}>月薪: {user.salary}</div> : null}
                                    <div style={{padding: '5px 0'}}>描述: {user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}

UserList.propTypes = {
    userList: PropTypes.array
};

UserList.defaultProps = {
    userList: []
};