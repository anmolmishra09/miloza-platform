
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

import type {
  AppState,
  ChatRequest,
  Conversation,
  Message,
  Notification,
  User,
  View,
} from "./types";

import { seedUsers } from "./lib/seed";
import { loadState, saveState } from "./lib/storage";

import { Landing } from "./components/Landing";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Discover } from "./components/Discover";
import { Safety } from "./components/Safety";
import { FAQ } from "./components/FAQ";
import { AuthScreen } from "./components/AuthScreen";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./components/Dashboard";
import { Explore } from "./components/Explore";
import { Requests } from "./components/Requests";
import { Messages } from "./components/Messages";
import { ChatView } from "./components/ChatView";
import { ProfileView } from "./components/ProfileView";
import { Notifications } from "./components/Notifications";
import { Settings } from "./components/Settings";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<AppState>(() => loadState());
  const [view, setView] = useState<View>("landing");
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [viewingUser, setViewingUser] = useState<string | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId]
  );

  useEffect(() => {
    if (currentUser && (location.pathname === "/" || location.pathname === "/features")) {
      setView("dashboard");
      if (location.pathname !== "/") navigate("/", { replace: true });
    }

    if (!currentUser && location.pathname !== "/auth") {
      setView("landing");
    }
  }, [currentUser, location.pathname, navigate]);

  const onGetStarted = () => {
    if (currentUser) {
      setView("dashboard");
      navigate("/");
    } else {
      setView("auth");
      navigate("/auth");
    }
  };

  const updateUser = (patch: Partial<User>) => {
    if (!currentUser) return;
    setState((s) => ({
      ...s,
      users: s.users.map((u) =>
        u.id === currentUser.id ? { ...u, ...patch } : u
      ),
    }));
  };

  const pushNotification = (
    userId: string,
    type: Notification["type"],
    text: string
  ) => {
    setState((s) => ({
      ...s,
      notifications: [
        {
          id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          userId,
          type,
          text,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...s.notifications,
      ],
    }));
  };

  const register = (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const exists = state.users.some(
      (u) =>
        u.username.toLowerCase() === data.username.toLowerCase() ||
        u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (exists) {
      toast.error("That username or email is already taken.");
      return false;
    }

    const id = `u_${Date.now()}`;

    const newUser: User = {
      id,
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      avatarColor: pickColor(),
      bio: "New to MILOZA — say hi!",
      location: "Somewhere on Earth",
      interests: ["Music", "Travel"],
      online: true,
      verified: false,
      joinedAt: new Date().toISOString(),
      isPrivate: false,
      showOnline: true,
    };

    setState((s) => ({
      ...s,
      users: [...s.users, newUser],
      currentUserId: id,
    }));

    toast.success("Welcome to MILOZA!");
    setView("dashboard");
    navigate("/", { replace: true });
    return true;
  };

  const login = (identifier: string, password: string) => {
    const user = state.users.find(
      (u) =>
        (u.username.toLowerCase() === identifier.toLowerCase() ||
          u.email.toLowerCase() === identifier.toLowerCase()) &&
        u.password === password
    );

    if (!user) {
      toast.error("We couldn't find an account with those details.");
      return false;
    }

    setState((s) => ({
      ...s,
      currentUserId: user.id,
      users: s.users.map((u) =>
        u.id === user.id ? { ...u, online: true } : u
      ),
    }));

    toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
    setView("dashboard");
    navigate("/", { replace: true });
    return true;
  };

  const logout = () => {
    if (currentUser) updateUser({ online: false });

    setState((s) => ({ ...s, currentUserId: null }));
    setView("landing");
    navigate("/", { replace: true });
    toast("You've been signed out.");
  };

  const sendRequest = (toId: string) => {
    if (!currentUser) return;

    if (
      state.blocks.some(
        (b) =>
          (b.blockerId === toId && b.blockedId === currentUser.id) ||
          (b.blockerId === currentUser.id && b.blockedId === toId)
      )
    ) {
      toast.error("You can't send a request to this user.");
      return;
    }

    if (
      state.requests.some(
        (r) =>
          r.fromId === currentUser.id &&
          r.toId === toId &&
          r.status === "pending"
      )
    ) {
      toast("Request already sent.");
      return;
    }

    const req: ChatRequest = {
      id: `r_${Date.now()}`,
      fromId: currentUser.id,
      toId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setState((s) => ({ ...s, requests: [req, ...s.requests] }));

    const target = state.users.find((u) => u.id === toId);

    pushNotification(
      toId,
      "request",
      `${currentUser.name} sent you a chat request.`
    );

    toast.success(`Chat request sent to ${target?.name ?? "user"}.`);
  };

  const cancelRequest = (requestId: string) => {
    setState((s) => ({
      ...s,
      requests: s.requests.filter((r) => r.id !== requestId),
    }));
    toast("Request cancelled.");
  };

  const respondRequest = (id: string, accept: boolean) => {
    const req = state.requests.find((r) => r.id === id);
    if (!req) return;

    setState((s) => {
      const requests = s.requests.map((r) =>
        r.id === id
          ? {
              ...r,
              status: (accept ? "accepted" : "rejected") as ChatRequest["status"],
            }
          : r
      );

      if (!accept) return { ...s, requests };

      const conversation: Conversation = {
        id: `c_${Date.now()}`,
        memberIds: [req.fromId, req.toId],
        createdAt: new Date().toISOString(),
      };

      return {
        ...s,
        requests,
        conversations: [conversation, ...s.conversations],
      };
    });

    pushNotification(
      req.fromId,
      accept ? "accepted" : "rejected",
      accept
        ? `${currentUser?.name ?? "Someone"} accepted your chat request.`
        : `${currentUser?.name ?? "Someone"} declined your chat request.`
    );

    toast.success(accept ? "Request accepted — you can chat now!" : "Request declined.");
  };

  const openConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    setView("chat");
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!currentUser) return;

    const msg: Message = {
      id: `m_${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      text,
      createdAt: new Date().toISOString(),
    };

    setState((s) => ({ ...s, messages: [...s.messages, msg] }));

    const conv = state.conversations.find((c) => c.id === conversationId);
    const otherId = conv?.memberIds.find((id) => id !== currentUser.id);

    if (otherId) {
      pushNotification(otherId, "message", `${currentUser.name}: ${text.slice(0, 40)}`);

      setTimeout(() => {
        const reply: Message = {
          id: `m_${Date.now()}_r`,
          conversationId,
          senderId: otherId,
          text: autoReply(text),
          createdAt: new Date().toISOString(),
        };

        setState((s) => ({ ...s, messages: [...s.messages, reply] }));
      }, 1400);
    }
  };

  const blockUser = (userId: string) => {
    if (!currentUser) return;

    setState((s) => ({
      ...s,
      blocks: [
        ...s.blocks,
        {
          id: `b_${Date.now()}`,
          blockerId: currentUser.id,
          blockedId: userId,
          createdAt: new Date().toISOString(),
        },
      ],
      conversations: s.conversations.filter(
        (c) =>
          !(c.memberIds.includes(userId) && c.memberIds.includes(currentUser.id))
      ),
    }));

    toast.success("User blocked.");
  };

  const unblockUser = (userId: string) => {
    if (!currentUser) return;

    setState((s) => ({
      ...s,
      blocks: s.blocks.filter(
        (b) => !(b.blockerId === currentUser.id && b.blockedId === userId)
      ),
    }));

    toast("User unblocked.");
  };

  const reportUser = (userId: string, reason: string) => {
    if (!currentUser) return;

    setState((s) => ({
      ...s,
      reports: [
        ...s.reports,
        {
          id: `rep_${Date.now()}`,
          reporterId: currentUser.id,
          reportedId: userId,
          reason,
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      ],
    }));

    toast.success("Report submitted. Our team will review it.");
  };

  const markNotificationsRead = () => {
    if (!currentUser) return;

    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) =>
        n.userId === currentUser.id ? { ...n, read: true } : n
      ),
    }));
  };

  const openUser = (userId: string) => {
    setViewingUser(userId);
    setView("profile");
  };

  const resetDemo = () => {
    setState({
      users: seedUsers(),
      currentUserId: null,
      requests: [],
      conversations: [],
      messages: [],
      blocks: [],
      reports: [],
      notifications: [],
    });

    setView("landing");
    navigate("/", { replace: true });
    toast("Demo data reset.");
  };

  const renderView = () => {
    if (!currentUser) {
      if (view === "auth") {
        return (
          <AuthScreen
            onRegister={register}
            onLogin={login}
            onBack={() => {
              setView("landing");
              navigate("/");
            }}
          />
        );
      }

      return <Landing onGetStarted={onGetStarted} />;
    }

    switch (view) {
      case "dashboard":
        return (
          <Dashboard
            state={state}
            currentUser={currentUser}
            onOpenUser={openUser}
            onSendRequest={sendRequest}
            onOpenConversation={openConversation}
            onNavigate={setView}
          />
        );

      case "explore":
        return (
          <Explore
            state={state}
            currentUser={currentUser}
            onOpenUser={openUser}
            onSendRequest={sendRequest}
          />
        );

      case "requests":
        return (
          <Requests
            state={state}
            currentUser={currentUser}
            onRespond={respondRequest}
            onCancel={cancelRequest}
            onOpenUser={openUser}
          />
        );

      case "messages":
        return (
          <Messages
            state={state}
            currentUser={currentUser}
            onOpenConversation={openConversation}
          />
        );

      case "chat":
        return activeConversation ? (
          <ChatView
            state={state}
            currentUser={currentUser}
            conversationId={activeConversation}
            onSend={sendMessage}
            onBack={() => setView("messages")}
            onOpenUser={openUser}
          />
        ) : (
          <Messages
            state={state}
            currentUser={currentUser}
            onOpenConversation={openConversation}
          />
        );

      case "profile":
        return viewingUser ? (
          <ProfileView
            state={state}
            currentUser={currentUser}
            userId={viewingUser}
            onBack={() => setView("dashboard")}
            onSendRequest={sendRequest}
            onCancelRequest={cancelRequest}
            onBlock={blockUser}
            onUnblock={unblockUser}
            onReport={reportUser}
            onOpenConversation={openConversation}
          />
        ) : null;

      case "notifications":
        return (
          <Notifications
            state={state}
            currentUser={currentUser}
            onMarkAllRead={markNotificationsRead}
            onNavigate={setView}
          />
        );

      case "settings":
        return (
          <Settings
            currentUser={currentUser}
            onUpdate={updateUser}
            onReset={resetDemo}
            onLogout={logout}
            state={state}
            onUnblock={unblockUser}
          />
        );

      default:
        return null;
    }
  };

  if (!currentUser) {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={<Landing onGetStarted={onGetStarted} />}
          />
          <Route
            path="/features"
            element={<Features onGetStarted={onGetStarted} />}
          />
          <Route
  path="/HowItWorks"
  element={<HowItWorks onGetStarted={onGetStarted} />}
/>
<Route
  path="/discover"
  element={<Discover onGetStarted={onGetStarted} />}
/>
<Route
  path="/safety"
  element={<Safety onGetStarted={onGetStarted} />}
/>
<Route
  path="/faq"
  element={<FAQ onGetStarted={onGetStarted} />}
/>
          <Route
            path="/auth"
            element={
              <AuthScreen
                onRegister={register}
                onLogin={login}
                onBack={() => navigate("/")}
              />
            }
          />
          <Route path="*" element={<Landing onGetStarted={onGetStarted} />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <>
      <AppShell
        currentUser={currentUser}
        view={view}
        onNavigate={setView}
        onLogout={logout}
        pendingCount={state.requests.filter(
          (r) => r.toId === currentUser.id && r.status === "pending"
        ).length}
        unreadCount={state.notifications.filter(
          (n) => n.userId === currentUser.id && !n.read
        ).length}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (activeConversation ?? "") + (viewingUser ?? "")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </AppShell>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function pickColor() {
  const colors = ["#B5B1DC", "#7C9D8C", "#FBFF62", "#ADA28C"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function autoReply(text: string) {
  const replies = [
    "That's awesome! Tell me more 😄",
    "Haha totally agree with you.",
    "Oh nice — where are you from?",
    "Sounds fun! What are you into?",
    "I love that. Let's keep chatting!",
  ];

  if (text.trim().endsWith("?")) {
    return "Great question! I'd say yes, definitely.";
  }

  return replies[Math.floor(Math.random() * replies.length)];
}
