import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createProject = createAsyncThunk(
  "Project/createProject",
  async ({ updatedProjectData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createProject(updatedProjectData);
      toast.success("Project Added Successfully");
      navigate("/adminDashboard/dashboardProject");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your projectSlice.js

export const getProjects = createAsyncThunk(
  "Project/getProjects",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getProjects(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchProjects = createAsyncThunk(
  "Project/searchProjects",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getProjectsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getProject = createAsyncThunk(
  "Project/getProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProject(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjectsByUser = createAsyncThunk(
  "Project/getProjectsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getProjectsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "Project/deleteProject",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteProject(id);
      toast.success("Project Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "Project/updateProject",
  async ({ id, updatedProjectData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateProject(updatedProjectData, id);
      toast.success("Project Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearProject = createAction("Project/clearProject");

// eslint-disable-next-line react-refresh/only-export-components
const ProjectSlice = createSlice({
  name: "Project",
  initialState: {
    Project: {},
    Projects: [],
    userProjects: [],

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
    [createProject.pending]: (state, action) => {
      state.loading = true;
    },

    [createProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.Projects = [action.payload];
    },
    [createProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProjects.pending]: (state, action) => {
      state.loading = true;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.Projects = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getProjects.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Unknown error occurred";
    },
    [clearProject]: (state) => {
      state.Project = {};
    },

    [getProject.pending]: (state, action) => {
      state.loading = true;
    },
    [getProject.fulfilled]: (state, action) => {
      state.loading = false;
      state.Project = action.payload;
    },
    [getProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProjectsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getProjectsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userProjects = action.payload;
    },
    [getProjectsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    },
    [searchProjects.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.Projects = action.payload;
    },
    [searchProjects.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProject.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProjects = state.userProjects.filter(
          (item) => item._id !== id
        );
        state.Projects = state.Projects.filter((item) => item._id !== id);
      }
    },
    [deleteProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProject.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProject.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userProjects = state.userProjects.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Projects = state.Projects.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateProject.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = ProjectSlice.actions;

export default ProjectSlice.reducer;
