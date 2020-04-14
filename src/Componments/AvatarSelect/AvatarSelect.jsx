import React, {Component} from 'react';
import {List, Grid} from "antd-mobile";
import './AvatarSelect.css';

export default class AvatarSelect extends Component {

    constructor(props) {
        super(props);
        this.headerList = [];
        for(let i=1; i<=20; i++){
            this.headerList.push({
                icon: require(`../../assets/images/头像${i}.png`),
                text: `头像${i}`
            })
        }
        this.state = {
            header: ''
        };
    }

    showheader = (obj)=>{
        this.setState({
            header: obj.icon
        });
        this.props.setheader(obj.text);
    };

    render() {
        const {header} = this.state;

        const headerDiv = (
            <div className='avatarBox'>
                {
                    header ? '当前选中的头像为' : '请选择头像'
                }
                {
                    header ? <img src={header}/> : null
                }
            </div>
        );
        return (
            <List renderHeader={()=> headerDiv}>
                <Grid
                    data={this.headerList}
                    columnNum={5}
                    onClick={(obj, index)=>{
                        this.showheader(obj);
                    }}
                />
            </List>
        )
    }
}