import { Textarea } from '@mantine/core';
import React from 'react';
import { useSetState } from '@mantine/hooks';
import { Button, buttonVariants } from '@components/chat/button.jsx';
import { cn } from '@utility/utils.js';
import { createContent$ } from '@/service/instagramService.js';

export const SlideTwo = ({ assistantName, setParentState }) => {
  const [state, setState] = useSetState({
    submit: false,
    instructions: '',
    loaded: false,
  });

  const onSubmitHandler = () => {
    createContent$(assistantName, state.instructions).subscribe({
      next: (res) => {
        setParentState({
          imageURL: res.imageURL,
          caption: res.caption,
        });
      },
      complete: () => {
        setState({ submit: true });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-between gap-6 pt-12">
      <Textarea
        label={
          <div className="flex">
            <span className="pb-4">
              Give us a detailed overview of how you want to generate your
              instagram caption
            </span>
            <span className="pb-4"></span>
          </div>
        }
        value={state.instructions}
        onChange={(event) =>
          setState({ instructions: event.currentTarget.value })
        }
        size={20}
        autosize
        minRows={12}
      />
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
            buttonVariants({ variant: 'outline', size: 'lg' }),
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
