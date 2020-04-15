import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/actionCreator";
import UserList from "../../Componments/UserList/UserList";
import PropTypes from 'prop-types';

class Boss extends Component {

    componentDidMount() {
        this.props.getUserList('jobHunter');
    }

    render() {
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}

Boss.propTypes = {
    userList: PropTypes.array,
    getUserList: PropTypes.func
};

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Boss);