import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, NumberField } from 'react-admin';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ApprovalActions from './ApprovalActions'; // 수정된 ApprovalActions

export const ProjectShow = (props) => (
  <Card style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    <CardContent>
      <Typography variant="h4" gutterBottom>
        프로젝트 상세 정보
      </Typography>
      <Show {...props}>
        <SimpleShowLayout>
          <Grid container spacing={2}>
            {[
              { label: "수혜자", source: "beneficiaryName" },
              { label: "분류", source: "categoryName" },
              { label: "제목", source: "title" },
              { label: "내용", source: "description" },
              { label: "목표 금액", source: "targetAmount" },
              { label: "시작일", source: "startDate" },
              { label: "종료일", source: "endDate" },
              { label: "상태", source: "status" }
            ].map((field, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={2} style={{ padding: '10px' }}>
                  <Typography variant="subtitle1" fontWeight="bold">{field.label}</Typography>
                  <TextField source={field.source} fullWidth />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <ApprovalActions />
        </SimpleShowLayout>
      </Show>
    </CardContent>
  </Card>
);
