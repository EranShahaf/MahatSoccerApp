import React, { useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Divider
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllArticles, fetchArticles } from '../state/slices/articlesSlice';
import ReactMarkdown from 'react-markdown';

const Newsletter = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles) || [];
  const articlesStatus = useSelector((state) => state?.articles?.status || "idle");
  const error = useSelector((state) => state?.articles?.isError);

  useEffect(() => {
    if (articlesStatus === "idle") {
      dispatch(fetchArticles());
    }
  }, [articlesStatus, dispatch]);

  // Helper function to convert bytes to text
  const bytesToText = (bytes) => {
    if (!bytes) return '';
    return new TextDecoder().decode(new Uint8Array(bytes));
  };

  let content;

  if (articlesStatus === "loading") {
    content = (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress sx={{ color: "#840000" }} />
      </Box>
    );
  } else if (articlesStatus === "succeeded") {
    content = (
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} key={article.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6,
              },
            }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {article.title}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ 
                  '& img': { // Style for images in markdown
                    maxWidth: '100%',
                    height: 'auto'
                  },
                  '& a': { // Style for links
                    color: '#840000',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  },
                  '& code': { // Style for code blocks
                    backgroundColor: '#f5f5f5',
                    padding: '2px 4px',
                    borderRadius: '4px'
                  },
                  '& blockquote': { // Style for blockquotes
                    borderLeft: '4px solid #840000',
                    margin: '16px 0',
                    padding: '8px 16px',
                    backgroundColor: '#f5f5f5'
                  },
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    color: '#840000'
                  }
                }}>
                  <ReactMarkdown>
                    {bytesToText(article.content)}
                  </ReactMarkdown>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Article ID: {article.id}
                  </Typography>
                  {article.creator && (
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                      Created by: {article.creator.username}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  } else if (articlesStatus === "failed") {
    content = (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" 
          sx={{ color: "#840000", mb: 4 }}>
          Football News & Updates
        </Typography>
        {content}
      </Paper>
    </Container>
  );
};

export default Newsletter;