import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Competitions',
      description: 'View all football competitions and their standings',
      path: '/competetions',
    },
    {
      title: 'Newsletter',
      description: 'Subscribe to our newsletter for latest updates',
      path: '/newsletter',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {options.map((option) => (
          <Grid item xs={12} md={6} key={option.title}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(option.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {option.title}
                </Typography>
                <Typography>
                  {option.description}
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ 
                    mt: 2,
                    backgroundColor: "#840000",
                    '&:hover': {
                      backgroundColor: "#C70039",
                    },
                  }}
                >
                  View {option.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage; 