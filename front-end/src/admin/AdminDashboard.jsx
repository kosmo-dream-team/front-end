// src/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDataProvider, Title } from 'react-admin';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
    const dataProvider = useDataProvider();
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        dataProvider.getOne('dashboard', { id: '' })
          .then(({ data }) => {
              setDashboard(data);
          })
          .catch(error => {
              console.error("대시보드 데이터를 가져오는 중 오류:", error);
          });
    }, [dataProvider]);

    if (!dashboard) return <div>Loading...</div>;

    return (
        <Card>
            <CardContent>
                <Title title="대시보드" />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6">총 회원 수</Typography>
                        <Typography variant="h4">{dashboard.totalUsers}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6">총 게시글 수</Typography>
                        <Typography variant="h4">{dashboard.totalProjects}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6">총 기부금</Typography>
                        <Typography variant="h4">{dashboard.totalDonations}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6">1인당 평균 기부금</Typography>
                        <Typography variant="h4">{dashboard.avgDonationPerUser.toFixed(2)}</Typography>
                    </Grid>
                </Grid>

                <Typography variant="h6" style={{ marginTop: '20px' }}>월별 기부 추이 (막대그래프)</Typography>
                <BarChart width={600} height={300} data={dashboard.donationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalDonation" fill="#8884d8" />
                </BarChart>

                <Typography variant="h6" style={{ marginTop: '20px' }}>상위 기부자 정보</Typography>
                <Grid container spacing={2}>
                    {dashboard.topDonors.map((donor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Typography variant="subtitle1">{donor.userName}</Typography>
                            <Typography variant="body1">총 기부금: {donor.totalDonation}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AdminDashboard;
