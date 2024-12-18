import React, { useEffect, useRef } from 'react';
import { initialFetch$, profileFetch$ } from '@/service/messageService.js';
import { map, mergeMap, of, repeat } from 'rxjs';
import { useSetState } from '@mantine/hooks';
import { chatContext } from '@/hooks/customHooks.jsx';
import { useAuthContext } from '@/context/auth/authContext.jsx';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@components/chat/resizable.jsx';
import { cn } from '@utility/utils.js';
import { Sidebar } from '@pages/chat/chatSidebar.jsx';
import { useChatStore } from '@/store/store.js';
import { Chat } from '@pages/chat/chat.jsx';

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
}) {
  const { pageProfile, chats } = chatContext();
  const { selectedOrg } = useAuthContext();
  const [state, setState] = useSetState({
    isCollapsed: defaultCollapsed,
    search: '',
    selectedUser: chats[pageProfile?.id][0],
  });
  const updateUserProfile = useChatStore((state) => state.updateUserProfile);
  const updateUser = useChatStore((state) => state.updateUser);
  const updateUnread = useChatStore((state) => state.updateUnread);
  const removeUnread = useChatStore((state) => state.removeUnread);
  const retriedProfiles = {};
  const retriedProfilesRef = useRef(retriedProfiles);

  const pageProfileRef = useRef(pageProfile);

  useEffect(() => {
    if (pageProfileRef.current !== null) {
      if (pageProfileRef.current.name !== pageProfile.name) {
        setState({ selectedUser: chats[pageProfile?.id][0] });
      }
      pageProfileRef.current = pageProfile;
    }
  }, [pageProfile]);

  useEffect(() => {
    const initialFetch = initialFetch$(
      pageProfile,
      selectedOrg.organization_uuid,
    ).pipe(
      mergeMap((user) => {
        if (Object.keys(retriedProfilesRef.current).includes(user.id))
          return of(user);
        return profileFetch$(
          user.id,
          pageProfile.id,
          selectedOrg.organization_uuid,
        ).pipe(
          map((res) => {
            const clonedUser = structuredClone(user);
            clonedUser.avatar = res.avatar;
            retriedProfilesRef.current = {
              ...retriedProfilesRef.current,
              [res.id]: true,
            };
            updateUserProfile(clonedUser);
            return clonedUser;
          }),
        );
      }),
      repeat({ delay: 5000 }),
    );
    const subscription = initialFetch.subscribe({
      next: (result) => {
        updateUser(result);
        result.read_timestamp == null
          ? updateUnread(result)
          : removeUnread(result);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pageProfile]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch bg-white shadow"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsible={true}
        minSize={state.isMobile ? 0 : 24}
        maxSize={state.isMobile ? 8 : 30}
        onCollapse={() => {
          setState({ isCollapsed: true });
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`;
        }}
        onExpand={() => {
          setState({ isCollapsed: false });
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`;
        }}
        className={cn(
          state.isCollapsed &&
            'min-w-[50px] transition-all duration-300 ease-in-out md:min-w-[70px]',
        )}
      >
        <Sidebar
          isCollapsed={state.isCollapsed || state.isMobile}
          setSearch={setState}
          pageProfile={pageProfile}
          links={chats[pageProfile?.id]
            .map((user) => ({
              name: user.name,
              messages: user.messages ?? [],
              avatar: user.avatar,
              variant:
                state.selectedUser?.name === user.name ? 'grey' : 'ghost',
              id: user.id,
              timestamp: user.timestamp,
              page: user.page,
            }))
            .filter((value) =>
              value.name.toLowerCase().includes(state.search.toLowerCase()),
            )
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))}
          isMobile={state.isMobile}
          setState={setState}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat
          messages={state.selectedUser.messages}
          selectedUser={state.selectedUser}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
