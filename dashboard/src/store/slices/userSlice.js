// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";


// const API = import.meta.env.VITE_BACKEND_URL || "https://mern-portfolio-backend-ke5j.onrender.com";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     user: {},
//     isAuthenticated: false,
//     error: null,
//     message: null,
//     isUpdated: false,
//   },
//   reducers: {
//     loginRequest(state, action) {
//       state.loading = true;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     logoutSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//       state.message = action.payload;
//     },
//     logoutFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = state.isAuthenticated;
//       state.user = state.user;
//       state.error = action.payload;
//     },
//     loadUserRequest(state, action) {
//       state.loading = true;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//     },
//     loadUserSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loadUserFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     updatePasswordRequest(state, action) {
//       state.loading = true;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updatePasswordSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updatePasswordFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     updateProfileRequest(state, action) {
//       state.loading = true;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updateProfileSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updateProfileFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     updateProfileResetAfterUpdate(state, action) {
//       state.error = null;
//       state.isUpdated = false;
//       state.message = null;
//     },
//     // clearAllErrors(state, action) {
//     //   state.error = null;
//     //   state = state.user;
//     // },
//     clearAllErrors(state) {
//       state.error = null;
//     },

//   },
// });

// // ── LOGIN ────────────────────────────────────────────────────────────────────
// export const login = (email, password) => async (dispatch) => {
//   dispatch(userSlice.actions.loginRequest());
//   try {
//     const { data } = await axios.post(
//       `${API}/api/v1/user/login`,
//       { email, password },
//       { withCredentials: true, headers: { "Content-Type": "application/json" } }
//     );
 
//     // ✅ Save token for cross-domain requests (Vercel dashboard → Render backend)
//     if (data.token) {
//       localStorage.setItem("adminToken", data.token);
//     }
 
//     dispatch(userSlice.actions.loginSuccess(data));
//   } catch (error) {
//     dispatch(userSlice.actions.loginFailed(
//       error.response?.data?.message || "Login failed"
//     ));
//   }
// };
// export const getUser = () => async (dispatch) => {
//   dispatch(userSlice.actions.loadUserRequest());
//   try {
//     const token = localStorage.getItem("adminToken");
//     const { data } = await axios.get(
//       `${API}/api/v1/user/me`,
//       {
//         withCredentials: true,
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       }
//     );
//     dispatch(userSlice.actions.loadUserSuccess(data.user));
//   } catch {
//     dispatch(userSlice.actions.loadUserFailed());
//   }
// };

// // ── LOGOUT ───────────────────────────────────────────────────────────────────
// export const logout = () => async (dispatch) => {
//   try {
//     await axios.get(`${API}/api/v1/user/logout`, { withCredentials: true });
//     localStorage.removeItem("adminToken"); // ✅ clear token
//     dispatch(userSlice.actions.logoutSuccess());
//   } catch (error) {
//     dispatch(userSlice.actions.logoutFailed(
//       error.response?.data?.message || "Logout failed"
//     ));
//   }
// };
 

// export const updatePassword =
//   (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
//     dispatch(userSlice.actions.updatePasswordRequest());
//     try {
//       const { data } = await axios.put(
//         "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/user/password/update",
//         { currentPassword, newPassword, confirmNewPassword },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       dispatch(userSlice.actions.updatePasswordSuccess(data.message));
//       dispatch(userSlice.actions.clearAllErrors());
//     } catch (error) {
//       dispatch(
//         userSlice.actions.updatePasswordFailed(error.response.data.message)
//       );
//     }
//   };

// export const updateProfile = (data) => async (dispatch) => {
//   dispatch(userSlice.actions.updateProfileRequest());
//   try {
//     const response = await axios.put(
//       "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/user/me/profile/update",
//       data,
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
//     dispatch(userSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       userSlice.actions.updateProfileFailed(error.response.data.message)
//     );
//   }
// };




// export const resetProfile = () => (dispatch) => {
//   dispatch(userSlice.actions.updateProfileResetAfterUpdate());
// };
// export const clearAllUserErrors = () => (dispatch) => {
//   dispatch(userSlice.actions.clearAllErrors());
// };

// export default userSlice.reducer;















import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL || "https://mern-portfolio-backend-ke5j.onrender.com";

// ── Token helper ─────────────────────────────────────────────────────────────
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem("adminToken");
  return {
    withCredentials: true,
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state) { state.loading = true; state.isAuthenticated = false; state.user = {}; state.error = null; },
    loginSuccess(state, action) { state.loading = false; state.isAuthenticated = true; state.user = action.payload; state.error = null; },
    loginFailed(state, action) { state.loading = false; state.isAuthenticated = false; state.user = {}; state.error = action.payload; },

    logoutSuccess(state, action) { state.loading = false; state.isAuthenticated = false; state.user = {}; state.error = null; state.message = action.payload; },
    logoutFailed(state, action) { state.loading = false; state.error = action.payload; },

    loadUserRequest(state) { state.loading = true; state.isAuthenticated = false; state.user = {}; state.error = null; },
    loadUserSuccess(state, action) { state.loading = false; state.isAuthenticated = true; state.user = action.payload; state.error = null; },
    loadUserFailed(state, action) { state.loading = false; state.isAuthenticated = false; state.user = {}; state.error = action.payload; },

    updatePasswordRequest(state) { state.loading = true; state.isUpdated = false; state.message = null; state.error = null; },
    updatePasswordSuccess(state, action) { state.loading = false; state.isUpdated = true; state.message = action.payload; state.error = null; },
    updatePasswordFailed(state, action) { state.loading = false; state.isUpdated = false; state.message = null; state.error = action.payload; },

    updateProfileRequest(state) { state.loading = true; state.isUpdated = false; state.message = null; state.error = null; },
    updateProfileSuccess(state, action) { state.loading = false; state.isUpdated = true; state.message = action.payload; state.error = null; },
    updateProfileFailed(state, action) { state.loading = false; state.isUpdated = false; state.message = null; state.error = action.payload; },
    updateProfileResetAfterUpdate(state) { state.error = null; state.isUpdated = false; state.message = null; },

    clearAllErrors(state) { state.error = null; },
  },
});

// ── LOGIN ─────────────────────────────────────────────────────────────────────
export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      `${API}/api/v1/user/login`,
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    console.log("🔥 LOGIN RESPONSE:", data); // debug

    // ✅ Token save karo
    if (data.token) {
      localStorage.setItem("adminToken", data.token);
      console.log("✅ Token saved:", data.token.slice(0, 20) + "...");
    } else {
      console.warn("⚠️ No token in response — check backend jwttoken.js");
    }

    // ✅ user object dispatch karo (data.user), not full data
    dispatch(userSlice.actions.loginSuccess(data.user || data));
  } catch (error) {
    console.log("❌ LOGIN ERROR:", error.response?.data);
    dispatch(userSlice.actions.loginFailed(
      error.response?.data?.message || "Login failed"
    ));
  }
};

// ── LOAD USER ─────────────────────────────────────────────────────────────────
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(
      `${API}/api/v1/user/me`,
      getAuthHeaders()
    );
    dispatch(userSlice.actions.loadUserSuccess(data.user));
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(
      error.response?.data?.message || "Failed to load user"
    ));
  }
};

// ── LOGOUT ────────────────────────────────────────────────────────────────────
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${API}/api/v1/user/logout`, getAuthHeaders());
    localStorage.removeItem("adminToken");
    dispatch(userSlice.actions.logoutSuccess("Logged out successfully"));
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(
      error.response?.data?.message || "Logout failed"
    ));
  }
};

// ── UPDATE PASSWORD ───────────────────────────────────────────────────────────
export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
  dispatch(userSlice.actions.updatePasswordRequest());
  try {
    const { data } = await axios.put(
      `${API}/api/v1/user/password/update`,
      { currentPassword, newPassword, confirmNewPassword },
      getAuthHeaders()
    );
    dispatch(userSlice.actions.updatePasswordSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.updatePasswordFailed(
      error.response?.data?.message || "Password update failed"
    ));
  }
};

// ── UPDATE PROFILE ────────────────────────────────────────────────────────────
export const updateProfile = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(
      `${API}/api/v1/user/me/profile/update`,
      formData,
      getAuthHeaders(true) // multipart
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.updateProfileFailed(
      error.response?.data?.message || "Profile update failed"
    ));
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

// Export helper for other slices to use
export { getAuthHeaders };

export default userSlice.reducer;