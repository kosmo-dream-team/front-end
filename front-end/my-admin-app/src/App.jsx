// src/App.jsx
import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import fakeRestDataProvider from 'ra-data-fakerest';
import ApplicationEdit from './ApplicationEdit';
import UserEdit from './UserEdit.jsx';

const data = {
  applications: [
    { id: 1, applicantName: '홍길동', status: '대기중' },
    { id: 2, applicantName: '김철수', status: '대기중' }
  ],
  users: [
    { id: 1, name: '사용자1', email: 'user1@example.com', status: 'inactive' },
    { id: 2, name: '사용자2', email: 'user2@example.com', status: 'active' }
  ]
};

const dataProvider = fakeRestDataProvider(data);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource 
      name="applications" 
      list={ListGuesser} 
      edit={ApplicationEdit} 
    />
    <Resource 
      name="users" 
      list={ListGuesser} 
      edit={UserEdit} 
    />
  </Admin>
);

export default App;
