import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';
import UserCard from './components/userCard';
import Menu from './components/menu';
import UnsubscribeButton from './components/unsubscribeButton'


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
            cities={[...new Set(window.props.users_list.map((user) => {return user.city}))].sort()}
            countries={[...new Set(window.props.users_list.map((user) => {return user.country}))].sort()}
            works={[...new Set(window.props.users_list.map((user) => {return user.tell_us_more}))].sort()}
          />
          {this.state.userList.map((user, index) => {
            return <UserCard 
            key={index}
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            username={user.username}
            city={user.city}
            country={user.country}
            tell_us_more={user.tell_us_more}
            mention={user.mention}
            linkedin={user.linkedin}
            profile_image_url={user.profile_image_url}
            />
          })}
          <UnsubscribeButton/>
        </>
        }
      </div>
    );
  }
}