// src/admin/ApprovalButtons.jsx

import { useRecordContext, useUpdate, useNotify, useRedirect, useRefresh } from 'react-admin';
import { Button, Box } from '@mui/material';
import { dataProvider } from '../data/dataProvider';
import { fakeData } from '../data/fakeData';

const ApprovalButtons = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const [update, { loading }] = useUpdate('applications');

  if (!record) return null;

  const handleApprove = async () => {
    console.log('현재 record:', record);
    try {
      await update(record.id, { ...record, status: '승인' });
      console.log('업데이트 호출 완료');
      notify('승인 처리 완료', { type: 'info' });
      refresh();
      // 업데이트 후 getOne을 호출하여 실제 데이터 확인
      const updated = await dataProvider.getOne('applications', { id: record.id });
      console.log('업데이트된 내용:', updated.data);
      // 리스트 페이지로 이동
      redirect('/admin/applications');
    } catch (error) {
      console.error('업데이트 에러:', error);
      notify('승인 처리 실패', { type: 'warning' });
    }
  };

  const handleReject = async () => {
    console.log('현재 record:', record);
    try {
      await update(record.id, { ...record, status: '거절' });
      console.log('업데이트 호출 완료');
      notify('거절 처리 완료', { type: 'info' });
      refresh();
      // 업데이트 후 getOne을 호출하여 실제 데이터 확인
      const updated = await dataProvider.getOne('applications', { id: record.id });
      console.log('업데이트된 내용:', updated.data);
      // 리스트 페이지로 이동
      redirect('/admin/applications');
    } catch (error) {
      console.error('업데이트 에러:', error);
      notify('거절 처리 실패', { type: 'warning' });
    }
  };

  return (
    <Box mt={2} display="flex" gap={2}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleApprove} 
        disabled={loading}
      >
        승인
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleReject} 
        disabled={loading}
      >
        거절
      </Button>
    </Box>
  );
};

export default ApprovalButtons;
