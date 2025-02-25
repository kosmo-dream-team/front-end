// src/admin/UserList.jsx
import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

const UserList = (props) => (
  <List {...props} title="회원 관리">
    <Datagrid rowClick="edit">
      <TextField source="userId" label="ID" />
      <EmailField source="email" label="이메일" />
      <TextField source="userName" label="회원 이름" />
      <TextField source="gender" label="성별" />
      <TextField source="phone" label="연락처" />
      <TextField source="userType" label="회원 유형" />
      <EditButton />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
);

export default UserList;
