import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("ACCESSTOKEN"));
const BASE = import.meta.env.VITE_BASE_URL;

// ===========================================
// SEND MESSAGE
// ===========================================

export const sendInboxMessage = createAsyncThunk(
  "inbox/sendInboxMessage",
  async (body) => {
    const res = await fetch(`${BASE}/api/inbox/send-inbox-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token.token,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
// ===========================================
// MARK AS UNREAD
// ===========================================
export const markAsUnread = createAsyncThunk(
  "inbox/markAsUnread",
  async (messageId) => {
    const res = await fetch(`${BASE}/api/inbox/mark-as-unread/${messageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token.token,
      },
    });
    return await res.json();
  }
);

// ===========================================
// MARK AS SEEN
// ===========================================
export const markAsSeen = createAsyncThunk(
  "inbox/markAsSeen",
  async (messageId) => {
    const res = await fetch(`${BASE}/api/inbox/mark-as-seen/${messageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token.token,
      },
    });
    return await res.json();
  }
);

// ===========================================
// ARCHIVE MESSAGE
// ===========================================
export const archiveMessage = createAsyncThunk(
  "inbox/archiveMessage",
  async (messageId) => {
    const res = await fetch(`${BASE}/api/inbox/archive/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token.token,
      },
    });
    return await res.json();
  }
);

// ===========================================
// GET THREAD
// ===========================================
export const fetchThread = createAsyncThunk(
  "inbox/fetchThread",
  async (threadId) => {
    const res = await fetch(`${BASE}/api/inbox/thread/${threadId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
        Authorization: token.token,
      },
    });
    return await res.json();
  }
);

// ===========================================
// GET INBOX
// ===========================================

export const fetchInbox = createAsyncThunk(
  "inbox/fetchInbox",
  async ({ page = 0, size = 10, receiverId }) => {
    const tokenObj = JSON.parse(localStorage.getItem("ACCESSTOKEN"));
    const token = tokenObj?.token;

    const res = await fetch(
      `${BASE}/api/inbox/get-inbox?page=${page}&size=${size}&receiverId=691e653096fd6d2e9f491d16`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
          Authorization: token,
        },
      }
    );

    const data = await res.json();

    return {
      messages: Array.isArray(data.content) ? data.content : [],
      page: data.number,
      size: data.size,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    };
  }
);

// ===========================================
// ADMIN SEARCH
// ===========================================
export const adminInboxSearch = createAsyncThunk(
  "inbox/adminSearch",
  async ({ query, page }) => {
    console.log("hhh");
    const res = await fetch(
      `${BASE}/api/inbox/admin/search?keyword=${query}&page=${page}&size=100000`,

      {
        method: "GET",
      }
    );
    return await res.json();
  }
);

// ===========================================
// DELETE MESSAGE
// ===========================================
export const deleteInboxMessage = createAsyncThunk(
  "inbox/deleteMessage",
  async (messageId) => {
    const res = await fetch(`${BASE}/api/inbox/${messageId}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  }
);

// =========================================================
// THE SLICE
// =========================================================
const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    inbox: [],
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
    searchloading: false,
    error: null,
    thread: [],
    searchResults: [],
    loading: false,
    error: "",
    success: false,
  },
  reducers: {
    resetInbox: (state) => {
      state.success = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH INBOX
      .addCase(fetchInbox.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.page === 0) {
          state.inbox = action.payload.messages; // first load
        } else {
          state.inbox = [...state.inbox, ...action.payload.messages]; // append
        }

        state.page = action.payload.page;
        state.size = action.payload.size;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })

      .addCase(fetchInbox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Inbox fetch failed";
      })

      // FETCH THREAD
      .addCase(fetchThread.fulfilled, (state, action) => {
        state.thread = action.payload;
      })

      // ADMIN SEARCH
      .addCase(adminInboxSearch.pending, (state) => {
        state.searchloading = true;
      })
      .addCase(adminInboxSearch.fulfilled, (state, action) => {
        state.searchloading = false;
        state.searchResults = action.payload.content;
      })
      .addCase(adminInboxSearch.rejected, (state, action) => {
        state.searchloading = false;
        state.error = action.error?.message ?? "Search failed";
      })

      // SEND MESSAGE, MARK SEEN/UNREAD, ARCHIVE, DELETE
      .addCase(sendInboxMessage.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(markAsUnread.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(markAsSeen.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(archiveMessage.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(deleteInboxMessage.fulfilled, (state) => {
        state.success = true;
      });
  },
});

export const { resetInbox } = inboxSlice.actions;
export default inboxSlice.reducer;
