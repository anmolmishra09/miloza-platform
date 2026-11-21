import type { AppState } from "@/types";
import { seedUsers } from "@/lib/seed";

const KEY = "vybora_state_v2";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed && Array.isArray(parsed.users) && parsed.users.length) {
        return {
          blocks: [],
          reports: [],
          notifications: [],
          ...parsed,
        };
      }
    }
  } catch {
    // ignore
  }
  return {
    users: seedUsers(),
    currentUserId: null,
    requests: [],
    conversations: [],
    messages: [],
    blocks: [],
    reports: [],
    notifications: [],
  };
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}