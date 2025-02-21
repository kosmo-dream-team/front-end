import { Card, CardContent, Typography, Grid } from '@mui/material';
import MonthlyDonationChart from './MonthlyDonationChart';

const AdminDashboard = () => {
  return (
    <Grid container spacing={2} style={{ padding: 16 }}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          관리자 대시보드
        </Typography>
      </Grid>
      
      {/* 기존 카드들 */}
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
      
      {/* 추가 요구사항 카드 */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">총 기부금</Typography>
            <Typography variant="body2">
              1,000,000원
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">캠페인 수</Typography>
            <Typography variant="body2">
              50
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">기부횟수</Typography>
            <Typography variant="body2">
              120회
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">1인당 평균 기부금액</Typography>
            <Typography variant="body2">
              8,333원
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6">기부금액 월별 그래프</Typography>
            <MonthlyDonationChart />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
