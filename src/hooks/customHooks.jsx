import { createContext, useContext, useState } from 'react';
import { useChatContext } from '@/hooks/contextStates.jsx';

export function useDisplayImage() {
  const [result, setResult] = useState('');

  function uploader(e) {
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      setResult(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  return { result, uploader };
}

const ChatContext = createContext(undefined);
export const chatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
  const chatContext = useChatContext();
  return (
    <ChatContext.Provider value={chatContext}>{children}</ChatContext.Provider>
  );
};
