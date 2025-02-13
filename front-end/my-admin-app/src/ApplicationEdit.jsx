// src/ApplicationEdit.jsx
import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import ApprovalButtons from './ApprovalButtons';

const ApplicationEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="applicantName" label="신청자" disabled />
      <TextInput source="status" label="상태" disabled />
      
      <ApprovalButtons />
    </SimpleForm>
  </Edit>
);

export default ApplicationEdit;
