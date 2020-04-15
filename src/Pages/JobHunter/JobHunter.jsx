import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/actionCreator";
import UserList from "../../Componments/UserList/UserList";
import PropTypes from 'prop-types';

class JobHunter extends Component {

    componentDidMount() {
        this.props.getUserList('boss');
    }

    render() {
        console.log('++++++++++++++');
        console.log(this.props.userList)
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}

JobHunter.propTypes = {
    userList: PropTypes.array,
    getUserList: PropTypes.func
};

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(JobHunter);