import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/article";

// ── Thunks ──────────────────────────────────────────────

export const getAllArticles = createAsyncThunk(
  "articles/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/all`, {
        withCredentials: true,
      });
      return data.articles;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  "articles/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.article;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "articles/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/update/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.article;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/delete/${id}`, { withCredentials: true });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ── Slice ────────────────────────────────────────────────

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearArticleState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(getAllArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CREATE
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.unshift(action.payload);
        state.message = "Article created successfully!";
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPDATE
    builder
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.articles.findIndex(
          (a) => a._id === action.payload._id
        );
        if (idx !== -1) state.articles[idx] = action.payload;
        state.message = "Article updated successfully!";
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // DELETE
    builder
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = state.articles.filter(
          (a) => a._id !== action.payload
        );
        state.message = "Article deleted successfully!";
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearArticleState } = articleSlice.actions;
export default articleSlice.reducer;