import { useSetState } from '@mantine/hooks';
import { useEffect } from 'react';

export function useAuth() {
  const [appState, setAppState] = useSetState({
    isAuthenticated: null,
    email: null,
    organizations: [],
    selectedOrg: null,
  });

  useEffect(() => {
    if (localStorage.getItem('jwt'))
      setAppState({
        isAuthenticated: true,
      });
  }, []);

  return {
    ...appState,
    setAppState,
  };
}

export function useChatContext() {
  const [chatState, setChatState] = useSetState({
    pageProfile: null,
    selectedUser: null,
    chats: [],
  });

  return {
    ...chatState,
    setChatState,
  };
}
