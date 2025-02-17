// src/admin/ApplicationEdit.jsx
import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import ApprovalButtons from './ApprovalButtons';


const ApplicationEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      {/* DonationForm에서 사용한 필드들을 모두 표시 */}
      <TextInput source="category" label="분류" disabled />
      <TextInput source="title" label="제목" disabled />
      <TextInput source="content" label="내용" disabled multiline />
      <TextInput source="targetAmount" label="목표 금액" disabled />
      <TextInput source="deadline" label="모집 기간" disabled />
      <TextInput source="beneficiaryName" label="수혜자" disabled />
      <TextInput source="beneficiaryContact" label="연락처" disabled />
      <TextInput source="status" label="상태" disabled />
      
      {/* 승인/거절 버튼 추가 */}
      <ApprovalButtons />
    </SimpleForm>
  </Edit>
);

export default ApplicationEdit;
