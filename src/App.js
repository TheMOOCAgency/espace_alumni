import React, { useState } from 'react';
import './App.css';
import UserCard from './components/user_card';
import Menu from './components/menu';



function App() {
  const [userList, setUserList] = useState([...window.props.users_list]);
  return (
    <div className="App">
      <Menu
        savedList={window.props.users_list}
        setUserList={setUserList}
        cities={[...new Set(userList.map((user) => {return user.city}))].sort()}
        countries={[...new Set(userList.map((user) => {return user.country}))].sort()}
      />
      {userList.map((user, index) => {
        return <UserCard 
        key={index}
        first_name={user.first_name}
        last_name={user.last_name}
        email={user.email}
        city={user.city}
        country={user.country}
        />
      })}
    </div>
  );
}

export default App;
