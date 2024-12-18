import React from 'react';
import { Button, buttonVariants } from '@components/chat/button.jsx';
import { cn } from '@utility/utils.js';
import { useSetState } from '@mantine/hooks';
import { IconBrandInstagram } from '@tabler/icons-react';
import { post$ } from '@/service/instagramService.js';

export const SlideThree = ({ parentState }) => {
  const [state, setState] = useSetState({
    submit: false,
  });

  const onSubmitHandler = () => {
    post$(parentState.imageURL, parentState.caption).subscribe({
      complete: () => setState({ submit: true }),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="p-4 text-xl font-light">
        Here is your AI generated image and caption :-{' '}
      </p>
      <img src={parentState.imageURL} alt="generatedImage" width={430} />
      <i className="font-semibold">{parentState.caption}</i>

      {!state.submit ? (
        <Button
          onClick={() => onSubmitHandler()}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'w-48 cursor-pointer border border-blue-500 text-blue-primary hover:bg-blue-primary hover:text-white',
          )}
        >
          <div className="flex flex-row justify-between gap-2">
            <span>Post to Instagram</span>
            <IconBrandInstagram className="text-2xl" />
          </div>
        </Button>
      ) : (
        <Button
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'w-48 cursor-pointer border bg-green-100 text-lg hover:bg-blue-primary hover:text-white',
          )}
          disabled
        >
          Post is Published
        </Button>
      )}
    </div>

    // IconBrandInstagram
  );
};
