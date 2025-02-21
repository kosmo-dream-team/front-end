// src/admin/UserList.jsx
import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

const UserList = (props) => (
  <List {...props} title="회원 관리">
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="이름" />
      <TextField source="email" label="이메일" />
      <TextField source="status" label="상태" />
      <EditButton label="편집" />
    </Datagrid>
  </List>
);

export default UserList;
