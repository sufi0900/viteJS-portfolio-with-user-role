import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createEducation = createAsyncThunk(
  "Education/createEducation",
  async ({ updatedEducationData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createEducation(updatedEducationData);
      toast.success("Education Added Successfully");
      navigate("/adminDashboard/dashboardEducation");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your EducationSlice.js

export const getEducations = createAsyncThunk(
  "Education/getEducations",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getEducations(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchEducations = createAsyncThunk(
  "Education/searchEducations",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getEducationsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getEducation = createAsyncThunk(
  "Education/getEducation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getEducation(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEducationsByUser = createAsyncThunk(
  "Education/getEducationsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getEducationsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "Education/deleteEducation",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteEducation(id);
      toast.success("Education Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateEducation = createAsyncThunk(
  "Education/updateEducation",
  async (
    { id, updatedEducationData, toast, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.updateEducation(updatedEducationData, id);
      toast.success("Education Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearEducation = createAction("Education/clearEducation");

const EducationSlice = createSlice({
  name: "Education",
  initialState: {
    Education: {},
    Educations: [],
    userEducations: [],

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
    [createEducation.pending]: (state, action) => {
      state.loading = true;
    },

    [createEducation.fulfilled]: (state, action) => {
      state.loading = false;
      state.Educations = [action.payload];
    },
    [createEducation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEducations.pending]: (state, action) => {
      state.loading = true;
    },
    [getEducations.fulfilled]: (state, action) => {
      state.loading = false;
      state.Educations = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getEducations.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Unknown error occurred";
    },
    [clearEducation]: (state) => {
      state.Education = {};
    },

    [getEducation.pending]: (state, action) => {
      state.loading = true;
    },
    [getEducation.fulfilled]: (state, action) => {
      state.loading = false;
      state.Education = action.payload;
    },
    [getEducation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEducationsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getEducationsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userEducations = action.payload;
    },
    [getEducationsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    },
    [searchEducations.pending]: (state, action) => {
      state.loading = true;
    },
    [searchEducations.fulfilled]: (state, action) => {
      state.loading = false;
      state.Educations = action.payload;
    },
    [searchEducations.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteEducation.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteEducation.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userEducations = state.userEducations.filter(
          (item) => item._id !== id
        );
        state.Educations = state.Educations.filter((item) => item._id !== id);
      }
    },
    [deleteEducation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateEducation.pending]: (state, action) => {
      state.loading = true;
    },
    [updateEducation.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userEducations = state.userEducations.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Educations = state.Educations.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateEducation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = EducationSlice.actions;

export default EducationSlice.reducer;
