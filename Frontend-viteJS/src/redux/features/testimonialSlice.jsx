/* eslint-disable react-refresh/only-export-components */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTestimonial = createAsyncThunk(
  "Testimonial/createTestimonial",
  async ({ updatedTestimonialData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTestimonial(updatedTestimonialData);
      toast.success("Testimonial Added Successfully");
      navigate("/adminDashboard/dashboardTestimonial");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your TestimonialSlice.js

export const getTestimonials = createAsyncThunk(
  "Testimonial/getTestimonials",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTestimonials(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchTestimonials = createAsyncThunk(
  "Testimonial/searchTestimonials",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getTestimonialsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getTestimonial = createAsyncThunk(
  "Testimonial/getTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTestimonial(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTestimonialsByUser = createAsyncThunk(
  "Testimonial/getTestimonialsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getTestimonialsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "Testimonial/deleteTestimonial",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTestimonial(id);
      toast.success("Testimonial Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "Testimonial/updateTestimonial",
  async (
    { id, updatedTestimonialData, toast, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateTestimonial(updatedTestimonialData, id);
      toast.success("Testimonial Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearTestimonial = createAction("Testimonial/clearTestimonial");

const TestimonialSlice = createSlice({
  name: "Testimonial",
  initialState: {
    Testimonial: {},
    Testimonials: [],
    userTestimonials: [],

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
    [createTestimonial.pending]: (state, action) => {
      state.loading = true;
    },

    [createTestimonial.fulfilled]: (state, action) => {
      state.loading = false;
      state.Testimonials = [action.payload];
    },
    [createTestimonial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTestimonials.pending]: (state, action) => {
      state.loading = true;
    },
    [getTestimonials.fulfilled]: (state, action) => {
      state.loading = false;
      state.Testimonials = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getTestimonials.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Unknown error occurred";
    },
    [clearTestimonial]: (state) => {
      state.Testimonial = {};
    },

    [getTestimonial.pending]: (state, action) => {
      state.loading = true;
    },
    [getTestimonial.fulfilled]: (state, action) => {
      state.loading = false;
      state.Testimonial = action.payload;
    },
    [getTestimonial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTestimonialsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getTestimonialsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTestimonials = action.payload;
    },
    [getTestimonialsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    },
    [searchTestimonials.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTestimonials.fulfilled]: (state, action) => {
      state.loading = false;
      state.Testimonials = action.payload;
    },
    [searchTestimonials.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTestimonial.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTestimonial.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTestimonials = state.userTestimonials.filter(
          (item) => item._id !== id
        );
        state.Testimonials = state.Testimonials.filter(
          (item) => item._id !== id
        );
      }
    },
    [deleteTestimonial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTestimonial.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTestimonial.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTestimonials = state.userTestimonials.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Testimonials = state.Testimonials.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTestimonial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = TestimonialSlice.actions;

export default TestimonialSlice.reducer;
