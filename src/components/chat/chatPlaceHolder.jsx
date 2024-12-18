import React from 'react';

function ChatPlaceHolder({ message }) {
  return (
    <div className="flex h-full !w-full items-center justify-center text-2xl">
      <span className="text-header font-bold text-light-grey">{message}</span>
    </div>
  );
}

export default ChatPlaceHolder;
