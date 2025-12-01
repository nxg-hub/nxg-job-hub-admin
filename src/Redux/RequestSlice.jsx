import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  stats: [],
  request: [],
  success: [],
  loading: false,
  error: false,
  multiCall: false,
  updateSuccess: false,
  updateError: false,
  updateLoading: false,
};

export const fetchRequestStats = createAsyncThunk("request/stats", async () => {
  return await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/requests/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
});

export const fetchRequest = createAsyncThunk("request/request", async () => {
  return await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/requests/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
});

export const updateRequestStatus = createAsyncThunk(
  "requests/updateStatus",
  async ({ id, status, adminNote }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/requests/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            adminNote,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");
      return { id, status };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const RequestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setMultiCall: (state, action) => {
      state.multiCall = action.payload;
    },
    setUpdateSuccess: (state, action) => {
      state.updateSuccess = action.payload;
    },
    resetUpdateState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestStats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stats = action.payload;
        state.success = true;
      })
      .addCase(fetchRequestStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.stats = [];
      })
      .addCase(fetchRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.request = action.payload;
        state.success = true;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.request = [];
      })
      .addCase(updateRequestStatus.pending, (state) => {
        state.updateLoading = true;
        state.updateError = false;
        state.updateSuccess = false;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload || true;
        state.updateSuccess = false;
      });
  },
});
export const { setMultiCall, setUpdateSuccess, resetUpdateState } =
  RequestSlice.actions;
export default RequestSlice.reducer;
