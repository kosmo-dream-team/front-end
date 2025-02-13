// src/ApprovalButtons.jsx
import React from 'react';
import { useRecordContext, useUpdate, useNotify, useRedirect } from 'react-admin';
import { Button, Box } from '@mui/material';

const ApprovalButtons = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const [update, { loading }] = useUpdate('applications');

  if (!record) return null;

  const handleApprove = async () => {
    try {
      const response = await update(record.id, { status: '승인' });
      console.log('업데이트 성공:', response);
      notify('승인 처리 완료', { type: 'info' });
      redirect('/applications');
    } catch (error) {
      console.error('업데이트 에러:', error);
      notify('승인 처리 실패', { type: 'warning' });
    }
  };

  const handleReject = async () => {
    try {
      const response = await update(record.id, { status: '거절' });
      console.log('업데이트 성공:', response);
      notify('거절 처리 완료', { type: 'info' });
      redirect('/applications');
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
