import { useEffect, useState } from 'react';
import { fetchMessages$ } from '@/service/messageService.js';
import { interval, of, switchMap } from 'rxjs';
import ChatTopBar from '@pages/chat/chatTopBar.jsx';
import { ChatList } from '@pages/chat/chatList.jsx';
import { useDisclosure } from '@mantine/hooks';
import { Loader } from '@components/loader.jsx';
import { chatContext } from '@/hooks/customHooks.jsx';
import { useAuthContext } from '@/context/auth/authContext.jsx';

export function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useDisclosure(false);
  const { pageProfile } = chatContext();
  const { selectedOrg } = useAuthContext();

  useEffect(() => {
    const selectedUserMessages$ = fetchMessages$(
      selectedUser,
      pageProfile,
      selectedOrg.organization_uuid,
    ).pipe(switchMap((result) => of(result)));

    const fetchMessagesWithDelay$ = interval(2000).pipe(
      switchMap(() => selectedUserMessages$),
    );

    const subscription = fetchMessagesWithDelay$.subscribe({
      next: (current) => {
        setMessages(current.messages);
        setLoaded.open();
      },
    });

    return () => {
      subscription.unsubscribe();
      setLoaded.close();
    };
  }, [selectedUser, pageProfile]);

  return !loaded ? (
    <div className="flex h-full items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopBar messages={messages} selectedUser={selectedUser} />

      <ChatList messages={messages} selectedUser={selectedUser} />
    </div>
  );
}
