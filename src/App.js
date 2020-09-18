import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';
import UserCard from './components/user_card';
import Menu from './components/menu';


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      texts: {},
      isLoading: true
    }
    this.setUserList = this.setUserList.bind(this)
  }
  
  setUserList(newData) {
    this.setState({
      userList: newData,
    });
  }

  componentWillMount() {
    const that = this
    const loadingProps = setInterval(function(){
      if (window.props && window.props.users_list && window.props.texts) {
        clearInterval(loadingProps);
        that.setState({
          userList: [...window.props.users_list],
          texts: {...window.props.texts},
          isLoading: false
        });
      }
    }, 500);
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ?
        <>
        <CircularProgress size={160} />
        </>
        :
        <>
          <Menu
            savedList={this.state.userList}
            setUserList={this.setUserList}
            cities={[...new Set(this.state.userList.map((user) => {return user.city}))].sort()}
            countries={[...new Set(this.state.userList.map((user) => {return user.country}))].sort()}
          />
          {this.state.userList.map((user, index) => {
            return <UserCard 
            key={index}
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            city={user.city}
            country={user.country}
            />
          })}
        </>
        }
      </div>
    );
  }
}