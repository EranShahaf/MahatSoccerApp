import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../api/api";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await server.get("/articles/");
    const articles = response.data;

    const articlesWithCreators = await Promise.all(
      articles.map(async (article) => {
        try {
          const creatorResponse = await server.get(`/users/${article.creator_id}`);
          return {
            ...article,
            creator: creatorResponse.data
          };
        } catch (error) {
          console.error(`Error fetching creator for article ${article.id}:`, error);
          return article;
        }
      })
    );

    return articlesWithCreators;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: "idle",
    isError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.isError = action.error.message;
      });
  },
});

export const selectAllArticles = (state) => state.articles.articles;
export default articlesSlice.reducer; 