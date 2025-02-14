// src/admin/AdminDashboard.jsx

import { Card, CardContent, Typography, Grid } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Grid container spacing={2} style={{ padding: 16 }}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          관리자 대시보드
        </Typography>
      </Grid>
      
      {/* 예시 카드 1: 신청 게시글 현황 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">신청 게시글 현황</Typography>
            <Typography variant="body2">
              총 신청 건수: 25
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 예시 카드 2: 회원 현황 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">회원 현황</Typography>
            <Typography variant="body2">
              총 회원 수: 100
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 예시 카드 3: 기타 관리 항목 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">기타 관리 항목</Typography>
            <Typography variant="body2">
              추가 기능을 여기에 표시합니다.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
