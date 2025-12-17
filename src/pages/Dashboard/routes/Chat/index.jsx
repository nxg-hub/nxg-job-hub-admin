import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../../../static/images/userIcon.png";

import {
  fetchInbox,
  fetchThread,
  sendInboxMessage,
  markAsSeen,
  markAsUnread,
  deleteInboxMessage,
  adminInboxSearch,
} from "../../../../Redux/inboxSlice";

const InboxChatUI = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserSlice.user);
  const receiverId = user.id;

  const {
    inbox,
    inboxPage,
    inboxTotalPages,
    inboxLoading,
    searchResults,
    thread,
    threadPage,
    threadTotalPages,
    threadLoading,
  } = useSelector((state) => state.inboxSlice);

  const [activeThreadId, setActiveThreadId] = useState(null);
  const [activeView, setActiveView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [sendingMessages, setSendingMessages] = useState([]);

  const inboxObserver = useRef(null);
  const threadRef = useRef(null);
  const threadTopRef = useRef(null);
  const fetchingOlderThread = useRef(false);

  // Load first page of inbox on mount
  useEffect(() => {
    dispatch(fetchInbox({ page: 0, size: 20, receiverId }));
  }, [dispatch, receiverId]);

  // Infinite scroll for inbox
  const inboxLoadMore = useCallback(() => {
    if (!inboxLoading && inboxPage + 1 < inboxTotalPages) {
      dispatch(fetchInbox({ page: inboxPage + 1, size: 10, receiverId }));
    }
  }, [inboxLoading, inboxPage, inboxTotalPages, dispatch, receiverId]);

  useEffect(() => {
    if (inboxObserver.current) inboxObserver.current.disconnect();

    inboxObserver.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) inboxLoadMore();
      },
      { threshold: 1 }
    );

    const lastMessage = document.querySelector("#inbox-bottom");
    if (lastMessage) inboxObserver.current.observe(lastMessage);
  }, [inboxLoadMore, inbox]);

  // Filter & deduplicate inbox messages
  const filteredMessages = (searchQuery ? searchResults : inbox)?.filter(
    (msg) => {
      if (filterStatus === "unread" && msg.seen) return false;
      if (filterStatus === "archived" && !msg.isArchived) return false;
      return true;
    }
  );

  const uniqueMessages = filteredMessages?.reduce((acc, msg) => {
    if (!acc.find((m) => m.threadId === msg.threadId)) acc.push(msg);
    return acc;
  }, []);

  // Open thread
  const openThread = (msg) => {
    setActiveThreadId(msg.threadId);
    setActiveView("thread");
    dispatch(fetchThread({ threadId: msg.threadId, page: 0, size: 20 }));
    dispatch(markAsSeen(msg.id));
  };

  // Auto-scroll to bottom when thread or sendingMessages change
  useEffect(() => {
    if (threadRef.current && !fetchingOlderThread.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [thread, sendingMessages]);

  // Handle fetching older messages when scrolling to top
  const handleThreadScroll = () => {
    if (!threadRef.current || threadLoading || fetchingOlderThread.current)
      return;

    if (threadRef.current.scrollTop < 50 && threadPage + 1 < threadTotalPages) {
      fetchingOlderThread.current = true;
      const scrollHeightBefore = threadRef.current.scrollHeight;

      dispatch(
        fetchThread({
          threadId: activeThreadId,
          page: threadPage + 1,
          size: 20,
        })
      )
        .unwrap()
        .then(() => {
          // Preserve scroll position
          const scrollHeightAfter = threadRef.current.scrollHeight;
          threadRef.current.scrollTop = scrollHeightAfter - scrollHeightBefore;
        })
        .finally(() => {
          fetchingOlderThread.current = false;
        });
    }
  };

  // Send reply
  const handleSendReply = () => {
    if (!thread || !replyText.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const newMessage = {
      id: tempId,
      senderId: user.id,
      senderName: "ADMIN",
      body: replyText,
      timestamp: new Date().toISOString(),
      isTemp: true,
    };

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
        setSendingMessages((prev) => prev.filter((m) => m.id !== tempId));
        dispatch(
          fetchThread({ threadId: thread[0].threadId, page: 0, size: 20 })
        );
        dispatch(fetchInbox({ page: 0, size: 10, receiverId }));
      })
      .catch(() =>
        setSendingMessages((prev) =>
          prev.map((m) => (m.id === tempId ? { ...m, failed: true } : m))
        )
      );
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

        {/* Inbox List */}
        <div className="flex-1 overflow-y-auto">
          {uniqueMessages?.map((msg) => (
            <div
              key={msg.threadId}
              className={`flex items-center p-3 border-b cursor-pointer ${
                msg.threadId === activeThreadId
                  ? "bg-[#e0f2ff]"
                  : !msg.seen
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => openThread(msg)}>
              <img
                src={msg.profilePicture || avatar}
                alt={msg.senderName || "User"}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
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
            </div>
          ))}

          <div id="inbox-bottom" className="py-4 text-center text-gray-500">
            {inboxLoading && <span>Loading...</span>}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — THREAD VIEW */}
      {activeView === "thread" && thread && thread.length > 0 && (
        <div className="flex-1 p-4 flex flex-col bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">
            {thread[0]?.subject || "Conversation"}
          </h2>

          <div
            ref={threadRef}
            className="flex-1 overflow-y-auto space-y-4"
            onScroll={handleThreadScroll}>
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

          {/* Reply box */}
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
