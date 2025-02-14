// src/admin/UserEdit.jsx
import { Edit, SimpleForm, TextInput, useRecordContext, useUpdate, useNotify, useRedirect } from 'react-admin';
import { Button, Box } from '@mui/material';

const UserEdit = (props) => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const [update, { loading }] = useUpdate('users');

  if (!record) {
    return <div>Loading...</div>;
  }

  // 회원 활성화 함수
  const handleActivate = async () => {
    try {
      await update(record.id, { status: 'active' });
      notify('회원 활성화 완료', { type: 'info' });
      redirect('/admin/users');
    } catch (error) {
      notify('회원 활성화 실패', { type: 'warning' });
    }
  };

  // 회원 비활성화 함수
  const handleDeactivate = async () => {
    try {
      await update(record.id, { status: 'inactive' });
      notify('회원 비활성화 완료', { type: 'info' });
      redirect('/admin/users');
    } catch (error) {
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
