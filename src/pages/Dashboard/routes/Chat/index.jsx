import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../../../static/images/userIcon.png";

import {
  fetchInbox,
  fetchThread,
  sendInboxMessage,
  markAsSeen,
  markAsUnread,
  archiveMessage,
  deleteInboxMessage,
  adminInboxSearch,
} from "../../../../Redux/inboxSlice";

const InboxChatUI = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserSlice.user);
  const receiverId = user.id;
  const { inbox, page, totalPages, searchResults, thread, loading } =
    useSelector((state) => state.inboxSlice);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [activeView, setActiveView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [sendingMessages, setSendingMessages] = useState([]);

  const bottomRef = useRef(null);
  const observer = useRef(null);

  // Load first page on mount
  useEffect(() => {
    dispatch(fetchInbox({ page: 0, size: 10, receiverId: receiverId }));
  }, []);

  // Infinite scroll observer
  const handleLoadMore = useCallback(() => {
    if (!loading && page + 1 < totalPages) {
      dispatch(
        fetchInbox({ page: page + 1, size: 10, receiverId: receiverId })
      );
    }
  }, [page, totalPages, loading]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore();
      },
      { threshold: 1 }
    );

    if (bottomRef.current) observer.current.observe(bottomRef.current);
  }, [handleLoadMore]);

  // Search
  const filteredMessages = (searchQuery ? searchResults : inbox)?.filter(
    (msg) => {
      if (filterStatus === "unread" && msg.seen) return false;
      if (filterStatus === "archived" && !msg.isArchived) return false;
      return true;
    }
  );
  // Remove duplicates by threadId
  const uniqueMessages = filteredMessages?.reduce((acc, msg) => {
    if (!acc.find((m) => m.threadId === msg.threadId)) {
      acc.push(msg);
    }
    return acc;
  }, []);

  // Open thread
  const openThread = (msg) => {
    dispatch(fetchThread(msg.threadId));
    dispatch(markAsSeen(msg.id));
    setActiveView("thread");
    setActiveThreadId(msg.threadId);
  };

  // Actions
  const handleMarkAsUnread = (id) => {
    dispatch(markAsUnread(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteInboxMessage(id));
  };

  const handleSendReply = () => {
    if (!thread || !replyText.trim()) return;

    // Create a temporary message
    const tempId = `temp-${Date.now()}`;
    const newMessage = {
      id: tempId,
      senderId: user.id,
      senderName: "ADMIN",
      body: replyText,
      timestamp: new Date().toISOString(),
      isTemp: true, // flag for loading
    };

    // Push it to local state for immediate display
    setSendingMessages((prev) => [...prev, newMessage]);
    setReplyText("");

    const payload = {
      receiverId: thread[0]?.senderId,
      subject: thread[0]?.subject || "",
      userType: "ADMIN",
      profilePicture: null,
      senderName: "ADMIN",
      body: newMessage.body,
      threadId: thread[0]?.threadId,
    };

    dispatch(sendInboxMessage(payload))
      .unwrap()
      .then(() => {
        // Remove the temp message after success
        setSendingMessages((prev) => prev.filter((m) => m.id !== tempId));
        // Refresh thread and inbox
        dispatch(fetchThread(thread[0].threadId));
        dispatch(fetchInbox({ page: 0, size: 10, receiverId: receiverId }));
      })
      .catch(() => {
        // Optionally mark failed messages
        setSendingMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...m, failed: true } : m))
        );
      });
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* LEFT SIDE — MESSAGE LIST */}
      <div className="w-1/3 border-r bg-white p-4 flex flex-col">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search inbox..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={() =>
              dispatch(adminInboxSearch({ query: searchQuery, page: 0 }))
            }
            className="mt-2 w-full bg-[#2596be] text-white py-2 rounded">
            Search
          </button>
        </div>
        {/* Filters */}
        <div className="flex mb-3 gap-2">
          {["all", "unread"].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded ${
                filterStatus === filter
                  ? "bg-[#2596be] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setFilterStatus(filter)}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        {/* Inbox List with Infinite Scroll */}
        <div className="flex-1 overflow-y-auto">
          {uniqueMessages?.map((msg) => (
            <div
              key={msg.threadId}
              className={`flex items-center p-3 border-b cursor-pointer ${
                msg.threadId === activeThreadId
                  ? "bg-[#e0f2ff]" // active chat highlight
                  : !msg.seen
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => openThread(msg)}>
              {/* Profile Picture */}
              <img
                src={msg.profilePicture || avatar}
                alt={msg.senderName || "User"}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />

              {/* Message Info */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{msg.senderName || "Unknown"}</p>
                  {msg.userType && (
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {msg.userType}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700">{msg.body}</p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              {/* <div className="flex flex-col ml-3 gap-1 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsUnread(msg.id);
                  }}
                  className="text-[#2596be] text-xs">
                  Mark unread
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg.id);
                  }}
                  className="text-red-600 text-xs">
                  Delete
                </button>
              </div> */}
            </div>
          ))}

          {/* Infinite scroll trigger */}
          <div ref={bottomRef} className="py-4 text-center text-gray-500">
            {loading && <span>Loading...</span>}
          </div>
        </div>
      </div>

      {/* RIGHT — THREAD VIEW */}
      {thread && thread.length > 0 && (
        <div className="flex-1 p-4 flex flex-col bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">
            {thread[0]?.subject || "Conversation"}
          </h2>
          <div className="flex-1 overflow-y-auto space-y-4">
            {[...thread, ...sendingMessages]
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((msg) => {
                const isSender = msg.senderId === user.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isSender ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        isSender
                          ? "bg-[#e5f6fb] rounded-br-none"
                          : "bg-white rounded-bl-none"
                      } shadow-sm relative`}>
                      <p className="font-medium text-sm">
                        {msg.senderName || "Unknown"}
                      </p>
                      <p className="mt-1 text-sm">{msg.body}</p>
                      <p className="mt-1 text-xs text-gray-400 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                      {msg.isTemp && (
                        <span className="absolute top-1 right-2 text-xs text-gray-500 animate-pulse">
                          Sending...
                        </span>
                      )}
                      {msg.failed && (
                        <span className="absolute top-1 right-2 text-xs text-red-500">
                          Failed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="mt-4">
            <textarea
              className="w-full border p-3 rounded"
              rows={3}
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              onClick={handleSendReply}
              className="mt-2 bg-[#2596be] text-white px-6 py-2 rounded">
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxChatUI;
