import { IconMoodSmile } from '@tabler/icons-react';
import { Popover } from '@mantine/core';
import EmojiPicker from 'emoji-picker-react';

export const Emoji = ({ onChange }) => {
  return (
    <Popover>
      <Popover.Target>
        <IconMoodSmile className="h-5 w-5 text-muted-foreground transition hover:text-foreground" />
      </Popover.Target>
      <Popover.Dropdown>
        <EmojiPicker
          emojiStyle="facebook"
          Theme="light"
          onEmojiClick={(emoji) => onChange(emoji.emoji)}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
