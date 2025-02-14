// src/App.jsx 또는 src/admin/AdminApp.jsx

import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import AdminDashboard from './admin/AdminDashboard';
import ApplicationList from './admin/ApplicationList';
import ApplicationEdit from './admin/ApplicationEdit';
import UserList from './admin/UserList';
import UserEdit from './admin/UserEdit';
import fakeRestDataProvider from 'ra-data-fakerest'
import { fakeData } from './data/fakeData';
import { dataProvider } from './data/dataProvider';

// const dataProvider = simpleRestProvider('http://localhost:3001'); // 실제 API 엔드포인트 또는 ra-data-fakerest

// const data = {
//   applications: [
//     { id: 1, applicantName: '홍길동', status: '대기중' },
//     { id: 2, applicantName: '김철수', status: '승인' },
//   ],
//   users: [
//     { id: 1, name: '사용자1', email: 'user1@example.com', status: 'active' },
//     { id: 2, name: '사용자2', email: 'user2@example.com', status: 'inactive' },
//   ],
// };




const AdminApp = () => (
  <Admin dashboard={AdminDashboard} dataProvider={dataProvider} basename="/admin">
    <Resource 
      name="applications" 
      list={ApplicationList} 
      edit={ApplicationEdit} 
    />
    <Resource 
      name="users" 
      list={UserList} 
      edit={UserEdit} 
    />
  </Admin>
);

export default AdminApp;
