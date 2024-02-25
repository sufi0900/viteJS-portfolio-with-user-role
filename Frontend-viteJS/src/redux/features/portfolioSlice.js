import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createPortfolio = createAsyncThunk(
  "Portfolio/createPortfolio",
  async ({ updatedPortfolioData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createPortfolio(updatedPortfolioData);
      toast.success("Portfolio Added Successfully");
      navigate("/adminDashboard/dashboardTeachnology");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your PortfolioSlice.js

export const getPortfolios = createAsyncThunk(
  "Portfolio/getPortfolios",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getPortfolios(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchPortfolios = createAsyncThunk(
  "Portfolio/searchPortfolios",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getPortfoliosBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getPortfolio = createAsyncThunk(
  "Portfolio/getPortfolio",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getPortfolio(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPortfoliosByUser = createAsyncThunk(
  "Portfolio/getPortfoliosByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getPortfoliosByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  "Portfolio/deletePortfolio",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePortfolio(id);
      toast.success("Portfolio Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePortfolio = createAsyncThunk(
  "Portfolio/updatePortfolio",
  async (
    { id, updatedPortfolioData, toast, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updatePortfolio(updatedPortfolioData, id);
      toast.success("Portfolio Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearPortfolio = createAction("Portfolio/clearPortfolio");

const PortfolioSlice = createSlice({
  name: "Portfolio",
  initialState: {
    Portfolio: {},
    Portfolios: [],
    userPortfolios: [],

    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createPortfolio.pending]: (state, action) => {
      state.loading = true;
    },

    [createPortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      state.Portfolios = [action.payload];
    },
    [createPortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPortfolios.pending]: (state, action) => {
      state.loading = true;
    },
    [getPortfolios.fulfilled]: (state, action) => {
      state.loading = false;
      state.Portfolios = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getPortfolios.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Unknown error occurred";
    },
    [clearPortfolio]: (state) => {
      state.Portfolio = {};
    },

    [getPortfolio.pending]: (state, action) => {
      state.loading = true;
    },
    [getPortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      state.Portfolio = action.payload;
    },
    [getPortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPortfoliosByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getPortfoliosByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userPortfolios = action.payload;
    },
    [getPortfoliosByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    },
    [searchPortfolios.pending]: (state, action) => {
      state.loading = true;
    },
    [searchPortfolios.fulfilled]: (state, action) => {
      state.loading = false;
      state.Portfolios = action.payload;
    },
    [searchPortfolios.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deletePortfolio.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userPortfolios = state.userPortfolios.filter(
          (item) => item._id !== id
        );
        state.Portfolios = state.Portfolios.filter((item) => item._id !== id);
      }
    },
    [deletePortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatePortfolio.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePortfolio.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userPortfolios = state.userPortfolios.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Portfolios = state.Portfolios.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updatePortfolio.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = PortfolioSlice.actions;

export default PortfolioSlice.reducer;
