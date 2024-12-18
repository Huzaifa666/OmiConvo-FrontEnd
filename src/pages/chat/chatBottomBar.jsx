import { IconPaperclip, IconSend2, IconThumbUp } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { buttonVariants } from '@components/chat/button.jsx';
import { Textarea } from '@components/chat/textarea.jsx';
import { cn } from '@utility/utils.js';
import { sendMessage$ } from '@/service/messageService.js';
import { useAuthContext } from '@/context/auth/authContext.jsx';
import { FileInput, Input } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { useDisplayImage } from '@/hooks/customHooks.jsx';
import { Emoji } from '@components/chat/emojiPicker.jsx';

export const BottombarIcons = [{ icon: IconPaperclip }];

export default function ChatBottomBar({ isMobile, selectedUser, pageProfile }) {
  const [state, setState] = useSetState({
    message: '',
    file: null,
  });
  const { result, uploader } = useDisplayImage();
  const inputRef = useRef(null);
  const { selectedOrg } = useAuthContext();

  const handleInputChange = (event) => {
    setState({ message: event.target.value });
  };
  const handleThumbsUp = () => {
    const newMessage = {
      id: Math.random() * 10,
      name: pageProfile.name,
      avatar: pageProfile.profile_image_url,
      recipient_id: selectedUser.id,
      message: '👍',
    };
    sendMessage$(
      newMessage,
      selectedUser.organization,
      pageProfile,
    ).subscribe();
    setState({ message: '' });
  };

  const handleSend = () => {
    if (state.message.trim()) {
      const newMessage = {
        id: Math.random() * 10,
        name: pageProfile.name,
        avatar: pageProfile.profile_image_url,
        recipient_id: selectedUser.id,
        message: state.message.trim(),
      };
      sendMessage$(
        newMessage,
        selectedOrg.organization_uuid,
        pageProfile,
      ).subscribe();
      setState({ message: '' });

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setState((prev) => ({ message: prev.message + '\n' }));
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      {BottombarIcons.map((icon, index) => (
        <div key={index}>
          <label htmlFor="fileInput">
            <icon.icon
              size={20}
              className="text-muted-foreground hover:bg-light-grey"
            />
          </label>
          <FileInput
            accept="image/png,image/jpeg"
            id="fileInput"
            type="file"
            onChange={() => {
              setState({ file: event.target.files[0] });
              uploader(event);
            }}
            display={'none'}
          />
        </div>
      ))}
      <div key="input" className="relative w-full">
        <Textarea
          autoComplete="off"
          value={state.message}
          ref={inputRef}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          name="message"
          placeholder="Aa"
          className=" flex h-9 w-full resize-none items-center overflow-hidden rounded-full border bg-background"
        ></Textarea>
        <div className="absolute bottom-2 right-2 hover:bg-light-grey">
          <Emoji
            onChange={(value) => {
              setState((prev) => ({ message: prev.message + value }));
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      </div>

      {state.message.trim() ? (
        <a
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'h-9 w-9',
            'dark:hover: shrink-0 cursor-pointer dark:bg-muted dark:text-muted-foreground  dark:hover:bg-muted',
          )}
          onClick={handleSend}
        >
          <IconSend2
            size={20}
            className="text-muted-foreground hover:bg-light-grey"
          />
        </a>
      ) : (
        <a
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'h-9 w-9',
            'dark:hover: shrink-0 cursor-pointer dark:bg-muted dark:text-muted-foreground  dark:hover:bg-muted',
          )}
          onClick={handleThumbsUp}
        >
          <IconThumbUp
            size={20}
            className="text-muted-foreground hover:bg-light-grey"
          />
        </a>
      )}
    </div>
  );
}
