// src/admin/ApplicationList.jsx
import React from 'react';
import { List, Datagrid, TextField, FunctionField, EditButton, Filter, SelectInput } from 'react-admin';

const categoryChoices = [
  { id: 1, name: '아동' },
  { id: 2, name: '동물' },
  { id: 3, name: '환경' },
  { id: 4, name: '장애인' },
  { id: 5, name: '지구촌' },
  { id: 6, name: '어르신' },
  { id: 7, name: '사회' },
];

const ApplicationFilter = (props) => (
  <Filter {...props}>
    <SelectInput
      source="categoryId" // 필터도 categoryId로 변경
      label="분류"
      choices={[
        { id: '', name: '전체' },
        ...categoryChoices,
      ]}
      alwaysOn
    />
  </Filter>
);

const ApplicationList = (props) => (
  <List {...props} title="신청 게시글 관리" filters={<ApplicationFilter />}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <FunctionField
        label="분류"
        render={record => {
          // categoryId 값을 이용하여 실제 분류 이름을 매핑합니다.
          const choice = categoryChoices.find(c => c.id === record.categoryId);
          return choice ? choice.name : record.categoryId;
        }}
      />
      <TextField source="userId" label="신청자" />
      <FunctionField
        label="상태"
        render={record => record.status ? record.status : '대기중'}
      />
      <EditButton label="승인/거절" />
    </Datagrid>
  </List>
);

export default ApplicationList;
