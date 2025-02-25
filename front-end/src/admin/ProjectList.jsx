import React from 'react';
import { List, Datagrid, TextField, ShowButton, DeleteButton } from 'react-admin';

export const ProjectList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="beneficiaryName" label="수혜자" />
            <TextField source="categoryName" label="분류" />
            <TextField source="title" label="제목" />
            <TextField source="status" label="상태" />
            <ShowButton />
            <DeleteButton undoable={false} />
        </Datagrid>
    </List>
);
