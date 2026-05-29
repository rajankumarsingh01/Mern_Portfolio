import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const careerSlice = createSlice({
  name: "career",

  initialState: {
    loading: false,
    items: [],
    singleItem: null,
    error: null,
    message: null,
  },

  reducers: {
    // =========================
    // GET ALL
    // =========================
    getAllCareerRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getAllCareerSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },

    getAllCareerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // GET SINGLE
    // =========================
    getSingleCareerRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getSingleCareerSuccess(state, action) {
      state.loading = false;
      state.singleItem = action.payload;
    },

    getSingleCareerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // ADD
    // =========================
    addCareerRequest(state) {
      state.loading = true;
      state.error = null;
    },

    addCareerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    addCareerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // UPDATE
    // =========================
    updateCareerRequest(state) {
      state.loading = true;
      state.error = null;
    },

    updateCareerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    updateCareerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // DELETE
    // =========================
    deleteCareerRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteCareerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    deleteCareerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // CLEAR
    // =========================
    clearAllCareerErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  getAllCareerRequest,
  getAllCareerSuccess,
  getAllCareerFailed,

  getSingleCareerRequest,
  getSingleCareerSuccess,
  getSingleCareerFailed,

  addCareerRequest,
  addCareerSuccess,
  addCareerFailed,

  updateCareerRequest,
  updateCareerSuccess,
  updateCareerFailed,

  deleteCareerRequest,
  deleteCareerSuccess,
  deleteCareerFailed,

  clearAllCareerErrors,
} = careerSlice.actions;

export default careerSlice.reducer;

// ============================================
// GET ALL CAREER ITEMS
// ============================================

export const getAllCareerItems =
  () => async (dispatch) => {
    dispatch(getAllCareerRequest());

    try {
      const { data } = await axios.get(
        "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/career/all",
        {
          withCredentials: true,
        }
      );

      dispatch(
        getAllCareerSuccess(
          data.opportunities || []
        )
      );
    } catch (error) {
      dispatch(
        getAllCareerFailed(
          error.response?.data?.message ||
            "Failed To Fetch Career Items"
        )
      );
    }
  };

// ============================================
// GET SINGLE CAREER ITEM
// ============================================

export const getSingleCareerItem =
  (id) => async (dispatch) => {
    dispatch(getSingleCareerRequest());

    try {
      const { data } = await axios.get(
        `https://mern-portfolio-backend-ke5j.onrender.com/api/v1/career/${id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(
        getSingleCareerSuccess(
          data.item
        )
      );
    } catch (error) {
      dispatch(
        getSingleCareerFailed(
          error.response?.data?.message ||
            "Failed To Fetch Career Item"
        )
      );
    }
  };

// ============================================
// ADD CAREER ITEM
// ============================================

export const addCareerItem =
  (formData) => async (dispatch) => {
    dispatch(addCareerRequest());

    try {
      const { data } = await axios.post(
        "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/career/add",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      dispatch(
        addCareerSuccess(
          data.message
        )
      );

      dispatch(getAllCareerItems());
    } catch (error) {
      dispatch(
        addCareerFailed(
          error.response?.data?.message ||
            "Failed To Add Career Item"
        )
      );
    }
  };

// ============================================
// UPDATE CAREER ITEM
// ============================================

export const updateCareerItem =
  ({ id, formData }) =>
  async (dispatch) => {
    dispatch(updateCareerRequest());

    try {
      const { data } = await axios.put(
        `https://mern-portfolio-backend-ke5j.onrender.com/api/v1/career/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      dispatch(
        updateCareerSuccess(
          data.message
        )
      );

      dispatch(getAllCareerItems());
    } catch (error) {
      dispatch(
        updateCareerFailed(
          error.response?.data?.message ||
            "Failed To Update Career Item"
        )
      );
    }
  };

// ============================================
// DELETE CAREER ITEM
// ============================================

export const deleteCareerItem =
  (id) => async (dispatch) => {
    dispatch(deleteCareerRequest());

    try {
      const { data } = await axios.delete(
        `https://mern-portfolio-backend-ke5j.onrender.com/api/v1/career/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(
        deleteCareerSuccess(
          data.message
        )
      );

      dispatch(getAllCareerItems());
    } catch (error) {
      dispatch(
        deleteCareerFailed(
          error.response?.data?.message ||
            "Failed To Delete Career Item"
        )
      );
    }
  };