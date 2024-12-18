import { TextInput } from '@mantine/core';
import { Button, buttonVariants } from '@components/chat/button.jsx';
import { cn } from '@utility/utils.js';
import React from 'react';
import { useSetState } from '@mantine/hooks';
import { createAssistant$ } from '@/service/instagramService.js';

export const SlideOne = ({ setParentState }) => {
  const [state, setState] = useSetState({
    name: '',
    caption: '',
    instructions: '',
    submit: false,
  });

  const onSubmitHandler = () => {
    setParentState({ assistantName: state.name });
    createAssistant$(state.name, state.caption).subscribe({
      complete: () => {
        setState({
          submit: true,
        });
      },
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-start gap-4 bg-white p-4">
      <TextInput
        className="w-full p-5"
        label="Name"
        size="lg"
        description="An apt store name will give us a better understanding"
        placeholder="Provide name of your store"
        value={state.name}
        onChange={(event) => setState({ name: event.currentTarget.value })}
      />
      <TextInput
        className="w-full p-5"
        label="Description"
        size="lg"
        description="Help us understand you better"
        placeholder="Provide Description for your store"
        value={state.caption}
        onChange={(event) => setState({ caption: event.currentTarget.value })}
      />
      <div className="w-full p-4"></div>
      {!state.submit ? (
        <Button
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'w-48 cursor-pointer border border-blue-500 text-blue-primary hover:bg-blue-primary hover:text-white',
          )}
          onClick={() => onSubmitHandler()}
        >
          Submit
        </Button>
      ) : (
        <Button
          className={cn(
            buttonVariants({ variant: 'outline', size: 'xl' }),
            'w-48 cursor-pointer border bg-green-100 text-lg hover:bg-blue-primary hover:text-white',
          )}
          disabled
        >
          Proceed to next step
        </Button>
      )}
    </div>
  );
};
