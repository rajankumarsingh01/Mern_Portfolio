import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:4000";

// Token helper — cookie nahi toh localStorage se
const getAuthConfig = (isFormData = false) => {
  const token = localStorage.getItem("adminToken");
  return {
    withCredentials: true,
    headers: {
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectsRequest(state) { state.projects = []; state.error = null; state.loading = true; },
    getAllProjectsSuccess(state, action) { state.projects = action.payload; state.error = null; state.loading = false; },
    getAllProjectsFailed(state, action) { state.error = action.payload; state.loading = false; },

    addNewProjectRequest(state) { state.loading = true; state.error = null; state.message = null; },
    addNewProjectSuccess(state, action) { state.error = null; state.loading = false; state.message = action.payload; },
    addNewProjectFailed(state, action) { state.error = action.payload; state.loading = false; state.message = null; },

    deleteProjectRequest(state) { state.loading = true; state.error = null; state.message = null; },
    deleteProjectSuccess(state, action) { state.error = null; state.loading = false; state.message = action.payload; },
    deleteProjectFailed(state, action) { state.error = action.payload; state.loading = false; state.message = null; },

    updateProjectRequest(state) { state.loading = true; state.error = null; state.message = null; },
    updateProjectSuccess(state, action) { state.loading = false; state.message = action.payload; state.error = null; },
    updateProjectFailed(state, action) { state.error = action.payload; state.loading = false; state.message = null; },

    resetProjectSlice(state) { state.error = null; state.message = null; state.loading = false; },
    clearAllErrors(state) { state.error = null; },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get(`${API}/api/v1/project/getall`, { withCredentials: true });
    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.getAllProjectsFailed(error.response?.data?.message || "Failed"));
  }
};

export const addNewProject = (formData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const { data } = await axios.post(
      `${API}/api/v1/project/add`,
      formData,
      getAuthConfig(true)   // ← multipart + token
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    console.log("❌ ADD PROJECT ERROR:", error.response?.data);
    dispatch(projectSlice.actions.addNewProjectFailed(error.response?.data?.message || "Failed to add project"));
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(
      `${API}/api/v1/project/delete/${id}`,
      getAuthConfig()      // ← token
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.deleteProjectFailed(error.response?.data?.message || "Failed to delete"));
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `${API}/api/v1/project/update/${id}`,
      newData,
      getAuthConfig(true)  // ← multipart + token
    );
    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    console.log("❌ UPDATE PROJECT ERROR:", error.response?.data);
    dispatch(projectSlice.actions.updateProjectFailed(error.response?.data?.message || "Failed to update"));
  }
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;