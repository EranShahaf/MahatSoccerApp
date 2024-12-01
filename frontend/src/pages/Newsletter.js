import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Divider,
  TextField,
  Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllArticles, fetchArticles } from '../state/slices/articlesSlice';
import ReactMarkdown from 'react-markdown';
import { server } from '../api/api';

const Newsletter = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles) || [];
  const articlesStatus = useSelector((state) => state?.articles?.status || "idle");
  const error = useSelector((state) => state?.articles?.isError);

  // Add new state for the form
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (articlesStatus === "idle") {
      dispatch(fetchArticles());
    }
  }, [articlesStatus, dispatch]);

  // Helper function to convert text to base64 string
  const textToBase64 = (text) => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    return btoa(String.fromCharCode(...bytes));
  };

  // Helper function to convert base64 string back to text
  const base64ToText = (base64String) => {
    if (!base64String) return '';
    try {
      const bytes = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch (error) {
      console.error('Error decoding content:', error);
      return '';
    }
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
                    {base64ToText(article.content)}
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert markdown content to base64 string
      const base64Content = textToBase64(newArticle.content);
      
      const response = await server.post('/articles/', {
        title: newArticle.title,
        content: base64Content // Send as base64 string
      });

      // Clear form and refresh articles
      setNewArticle({ title: '', content: '' });
      dispatch(fetchArticles());
    } catch (error) {
      console.error('Error creating article:', error?.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add the form component before the articles list
  const createArticleForm = (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#840000" }}>
        Create New Article
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={newArticle.title}
          onChange={handleInputChange}
          margin="normal"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Content (Markdown)"
          name="content"
          value={newArticle.content}
          onChange={handleInputChange}
          margin="normal"
          required
          multiline
          rows={4}
          helperText="Use Markdown formatting"
          sx={{ mb: 2 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isSubmitting}
          sx={{ 
            bgcolor: "#840000",
            '&:hover': {
              bgcolor: "#6b0000"
            }
          }}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Create Article'}
        </Button>
      </form>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" 
          sx={{ color: "#840000", mb: 4 }}>
          Football News & Updates
        </Typography>
        {createArticleForm}
        {content}
      </Paper>
    </Container>
  );
};

export default Newsletter;