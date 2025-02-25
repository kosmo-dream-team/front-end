// src/admin/UserEdit.jsx
import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';

const UserEdit = (props) => (
  <Edit {...props} title="회원 수정">
    <SimpleForm>
      <TextInput source="email" label="이메일" type="email" />
      <TextInput source="userName" label="회원 이름" />
      <SelectInput 
        source="gender" 
        label="성별" 
        choices={[
          { id: '남성', name: '남성' },
          { id: '여성', name: '여성' },
        ]}
      />
      <TextInput source="phone" label="연락처" />
      <SelectInput 
        source="userType" 
        label="회원 유형" 
        choices={[
          { id: 'donor', name: '기부자' },
          { id: 'applicant', name: '신청자' },
          { id: 'admin', name: '관리자' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
