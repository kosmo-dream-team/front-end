// src/admin/ApplicationEdit.jsx
import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
// ApprovalButtons는 현재 주석 처리되어 있음

const ApplicationEdit = (props) => (
  <Edit {...props} title="신청 게시글 상세">
    <SimpleForm>
      {/* 고유 식별자 */}
      <TextInput source="id" label="ID" disabled />
      {/* 백엔드에서 반환하는 필드에 맞춰 수정 */}
      <TextInput source="category" label="분류" disabled />
      <TextInput source="title" label="제목" disabled />
      <TextInput source="description" label="내용" disabled multiline />
      <TextInput source="targetAmount" label="목표 금액" disabled />
      <TextInput source="endDate" label="모집 기간" disabled />
      <TextInput source="status" label="상태" disabled />
      {/* 승인/거절 버튼은 현재 주석 처리 */}
      {/* <ApprovalButtons /> */}
    </SimpleForm>
  </Edit>
);

export default ApplicationEdit;
