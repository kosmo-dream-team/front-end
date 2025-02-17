// src/admin/ApplicationList.jsx
import React from 'react';
import { List, Datagrid, TextField, FunctionField, EditButton, Filter, SelectInput } from 'react-admin';

const ApplicationFilter = (props) => (
  <Filter {...props}>
    <SelectInput
      source="category"
      label="분류"
      choices={[     
        { id: '', name: '전체' },
        { id: '아동', name: '아동' },
        { id: '동물', name: '동물' },
        { id: '환경', name: '환경' },
        { id: '장애인', name: '장애인' },
        { id: '지구촌', name: '지구촌' },
        { id: '어르신', name: '어르신' },
        { id: '사회', name: '사회' },
      ]}
      alwaysOn
    />
  </Filter>
);

const ApplicationList = (props) => (
  <List {...props} title="신청 게시글 관리" filters={<ApplicationFilter />}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="category" label="분류" />
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
