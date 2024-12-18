import { cn, getFallbackProfile } from '@utility/utils.js';
import { useEffect, useRef } from 'react';
import ChatBottomBar from './chatBottomBar.jsx';
import ChatBubble from '@components/chat/chatBubble.jsx';
import { chatContext } from '@/hooks/customHooks.jsx';

export function ChatList({ messages, selectedUser }) {
  const messagesContainerRef = useRef(null);
  const prevDataLengthRef = useRef(null);
  const { pageProfile } = chatContext();
  useEffect(() => {
    if (prevDataLengthRef.current !== null) {
      if (prevDataLengthRef.current.length !== messages.length) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
    prevDataLengthRef.current = messages;
  }, [messages]);

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden rounded-xl rounded-bl-none rounded-tl-none rounded-tr-none border border-solid border-light-grey">
      <div
        ref={messagesContainerRef}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden scrollbar"
      >
        <div>
          {messages?.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col gap-2 whitespace-pre-wrap p-4',
                message.name !== selectedUser.name
                  ? 'items-end'
                  : 'items-start',
              )}
            >
              <div className="flex items-center gap-3">
                {message.name === selectedUser.name && (
                  <ChatBubble
                    src={
                      selectedUser.avatar
                        ? selectedUser.avatar
                        : getFallbackProfile('G')
                    }
                    content={message.content}
                    alt={message.name}
                    name={message.name}
                    message={message.message}
                    timestamp={message.timestamp}
                  />
                )}
                {message.name !== selectedUser.name && (
                  <ChatBubble
                    src={
                      pageProfile.avatar
                        ? pageProfile.avatar
                        : getFallbackProfile('A')
                    }
                    alt={pageProfile.name}
                    content={message.content}
                    name={pageProfile.name}
                    message={message.message}
                    timestamp={message.timestamp}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatBottomBar selectedUser={selectedUser} pageProfile={pageProfile} />
    </div>
  );
}
