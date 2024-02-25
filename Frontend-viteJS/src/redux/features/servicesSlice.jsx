import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createServices = createAsyncThunk(
  "Services/createServices",
  async ({ updatedServicesData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createServices(updatedServicesData);
      toast.success("Services Added Successfully");
      navigate("/adminDashboard/dashboardServices");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your ServicesSlice.js

export const getServicess = createAsyncThunk(
  "Services/getServicess",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getServicess(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchServicess = createAsyncThunk(
  "Services/searchServicess",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getServicessBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getServices = createAsyncThunk(
  "Services/getServices",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getServices(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getServicessByUser = createAsyncThunk(
  "Services/getServicessByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getServicessByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteServices = createAsyncThunk(
  "Services/deleteServices",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteServices(id);
      toast.success("Services Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateServices = createAsyncThunk(
  "Services/updateServices",
  async ({ id, updatedServicesData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateServices(updatedServicesData, id);
      toast.success("Services Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearServices = createAction("Services/clearServices");

// eslint-disable-next-line react-refresh/only-export-components
const ServicesSlice = createSlice({
  name: "Services",
  initialState: {
    Services: {},
    Servicess: [],
    userServicess: [],

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
    [createServices.pending]: (state, action) => {
      state.loading = true;
    },

    [createServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.Servicess = [action.payload];
    },
    [createServices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getServicess.pending]: (state, action) => {
      state.loading = true;
    },
    [getServicess.fulfilled]: (state, action) => {
      state.loading = false;
      state.Servicess = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getServicess.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Unknown error occurred";
    },
    [clearServices]: (state) => {
      state.Services = {};
    },

    [getServices.pending]: (state, action) => {
      state.loading = true;
    },
    [getServices.fulfilled]: (state, action) => {
      state.loading = false;
      state.Services = action.payload;
    },
    [getServices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getServicessByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getServicessByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userServicess = action.payload;
    },
    [getServicessByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    },
    [searchServicess.pending]: (state, action) => {
      state.loading = true;
    },
    [searchServicess.fulfilled]: (state, action) => {
      state.loading = false;
      state.Servicess = action.payload;
    },
    [searchServicess.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteServices.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteServices.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userServicess = state.userServicess.filter(
          (item) => item._id !== id
        );
        state.Servicess = state.Servicess.filter((item) => item._id !== id);
      }
    },
    [deleteServices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateServices.pending]: (state, action) => {
      state.loading = true;
    },
    [updateServices.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userServicess = state.userServicess.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Servicess = state.Servicess.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateServices.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = ServicesSlice.actions;

export default ServicesSlice.reducer;
