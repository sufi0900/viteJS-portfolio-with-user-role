/* eslint-disable react-refresh/only-export-components */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import * as api from "../api";

export const createSkill = createAsyncThunk(
  "Skill/createSkill",
  async ({ updatedSkillData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createSkill(updatedSkillData);
      toast.success("Skill Added Successfully");
      navigate("/adminDashboard/dashboardSkill");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// In your SkillSlice.js

export const getSkills = createAsyncThunk(
  "Skill/getSkills",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getSkills(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const searchSkills = createAsyncThunk(
  "Skill/searchSkills",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getSkillsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getSkill = createAsyncThunk(
  "Skill/getSkill",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSkill(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSkillsByUser = createAsyncThunk(
  "Skill/getSkillsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getSkillsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "Skill/deleteSkill",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteSkill(id);
      toast.success("Skill Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSkill = createAsyncThunk(
  "Skill/updateSkill",
  async ({ id, updatedSkillData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateSkill(updatedSkillData, id);
      toast.success("Skill Updated Successfully");

      // Navigate one step back
      navigate(-1);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const clearSkill = createAction("Skill/clearSkill");

const SkillSlice = createSlice({
  name: "Skill",
  initialState: {
    Skill: {},
    Skills: [],
    userSkills: [],

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
    [createSkill.pending]: (state, action) => {
      state.loading = true;
    },

    [createSkill.fulfilled]: (state, action) => {
      state.loading = false;
      state.Skills = [action.payload];
    },
    [createSkill.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSkills.pending]: (state, action) => {
      state.loading = true;
    },
    [getSkills.fulfilled]: (state, action) => {
      state.loading = false;
      state.Skills = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getSkills.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? action.payload.message
        : "Unknown error occurred";
    },
    [clearSkill]: (state) => {
      state.Skill = {};
    },

    [getSkill.pending]: (state, action) => {
      state.loading = true;
    },
    [getSkill.fulfilled]: (state, action) => {
      state.loading = false;
      state.Skill = action.payload;
    },
    [getSkill.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSkillsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getSkillsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userSkills = action.payload;
    },
    [getSkillsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    },
    [searchSkills.pending]: (state, action) => {
      state.loading = true;
    },
    [searchSkills.fulfilled]: (state, action) => {
      state.loading = false;
      state.Skills = action.payload;
    },
    [searchSkills.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSkill.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSkill.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userSkills = state.userSkills.filter((item) => item._id !== id);
        state.Skills = state.Skills.filter((item) => item._id !== id);
      }
    },
    [deleteSkill.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateSkill.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSkill.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userSkills = state.userSkills.map((item) =>
          item._id === id ? action.payload : item
        );
        state.Skills = state.Skills.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateSkill.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = SkillSlice.actions;

export default SkillSlice.reducer;
