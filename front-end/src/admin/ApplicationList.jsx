// src/admin/ApplicationList.jsx

import { List, Datagrid, TextField, FunctionField, EditButton } from 'react-admin';

const ApplicationList = (props) => (
  <List {...props} title="신청 게시글 관리">
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      {/* 여기서 applicantName이 아니라 beneficiaryName을 사용 */}
      <TextField source="beneficiaryName" label="신청자" />
      <FunctionField
        label="상태"
        render={record => record.status ? record.status : '대기중'}
      />
      <EditButton label="승인/거절" />
    </Datagrid>
  </List>
);

export default ApplicationList;
