// src/UserEdit.jsx
import React from 'react';
import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  useUpdate, 
  useNotify, 
  useRedirect, 
  useRecordContext 
} from 'react-admin';
import { Button, Box } from '@mui/material';

const UserEdit = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const record = useRecordContext();
  const [update, { loading }] = useUpdate('users');

  if (!record) {
    return <div>Loading...</div>;
  }

  // 회원 활성화 함수 (예: status를 'active'로 변경)
  const handleActivate = async () => {
    try {
      const response = await update(record.id, { status: 'active' });
      console.log('업데이트 성공:', response);
      notify('회원 활성화 완료', { type: 'info' });
      redirect('/users');
    } catch (error) {
      console.error('업데이트 에러:', error);
      notify('회원 활성화 실패', { type: 'warning' });
    }
  };

  // 회원 비활성화 함수 (예: status를 'inactive'로 변경)
  const handleDeactivate = async () => {
    try {
      const response = await update(record.id, { status: 'inactive' });
      console.log('업데이트 성공:', response);
      notify('회원 비활성화 완료', { type: 'info' });
      redirect('/users');
    } catch (error) {
      console.error('업데이트 에러:', error);
      notify('회원 비활성화 실패', { type: 'warning' });
    }
  };

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" label="이름" disabled />
        <TextInput source="email" label="이메일" disabled />
        <TextInput source="status" label="상태" disabled />

        <Box mt={2} display="flex" gap={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleActivate} 
            disabled={loading}
          >
            활성화
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleDeactivate} 
            disabled={loading}
          >
            비활성화
          </Button>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
