import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const fetchCurrentUser = (currentState, payload) => {
  if (!(payload.page in currentState)) return [-1, {}];
  const currentUserIndex = currentState[payload.page].findIndex(
    (user) => user.id === payload.id,
  );
  if (currentUserIndex !== -1) {
    return [currentUserIndex, currentState[payload.page][currentUserIndex]];
  }
  return [-1, {}];
};

const initialState = {
  users: {},
  unread: [],
  resolved: [],
  followUp: [],
  archived: [],
};

const updateState = (state, user) => {
  const [currentUserIndex, currentUser] = fetchCurrentUser(
    state.usersList,
    user,
  );
  if (currentUserIndex !== -1) {
    state.usersList[user.page][currentUserIndex] = {
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      timestamp: user.timestamp,
      page: user.page,
      messages: [...user.messages],
    };
    return state.usersList;
  } else {
    if (!(user.page in state.usersList)) {
      return {
        ...state.usersList,
        [`${user.page}`]: [user],
      };
    } else {
      return {
        ...state.usersList,
        [`${user.page}`]: [...state.usersList[`${user.page}`], user],
      };
    }
  }
};

export const updateUserProfile = (state, user) => {
  const [currentUserIndex, currentUser] = fetchCurrentUser(
    state.usersList,
    user,
  );
  if (currentUserIndex !== -1) {
    state.usersList[user.page][currentUserIndex] = {
      ...currentUser,
      avatar: user.avatar,
    };
  }
  return state.usersList;
};

const getCurrentTrackedUser = (currentState, currentUser) => {
  return currentState.some((user) => user.id === currentUser.id);
};

const updateUnread = (state, user) => {
  if (!getCurrentTrackedUser(state.unread, user)) {
    state.unread = [...state.unread, user];
  }
  return state.unread;
};

const removeUnread = (state, user) => {
  const readCheck = state.unread.filter((result) => result.id === user.id);
  if (readCheck.length > 0 && !readCheck[0].read_timestamp) {
    state.unread = state.unread.filter((result) => result.id !== user.id);
  }
  return state.unread;
};

export const useChatStore = create((set) => ({
  usersList: {},
  unread: [],
  resolved: [],
  followUp: [],
  archived: [],
  updateUser: (user) =>
    set((state) => ({ usersList: updateState(state, user) })),
  updateUserProfile: (user) => {
    set((state) => ({ usersList: updateUserProfile(state, user) }));
  },
  updateUnread: (user) => {
    set((state) => ({ unread: updateUnread(state, user) }));
  },
  removeUnread: (user) => {
    set((state) => ({ unread: removeUnread(state, user) }));
  },
  updateResolved: (user) => {
    set((state) => {
      if (!getCurrentTrackedUser(state.resolved, user))
        state.resolved = [...state.resolved, user];
      return state.resolved;
    });
  },
  updateFollowUp: (user) => {
    set((state) => {
      if (!getCurrentTrackedUser(state.followUp, user))
        state.followUp = [...state.followUp, user];
      return state.followUp;
    });
  },
  updateArchived: (user) => {
    set((state) => {
      if (!getCurrentTrackedUser(state.archived, user))
        state.archived = [...state.archived, user];
      return state.archived;
    });
  },
  reset: () => {
    set(initialState);
  },
}));

mountStoreDevtool('Chat Store', useChatStore);
