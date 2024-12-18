import React from 'react';
import soonImg from '@assets/images/logo-upward.gif';
import { IconPalette } from '@tabler/icons-react';
import { Button, buttonVariants } from '@/components/chat/button';
import { cn } from '@/utility/utils';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl px-4 py-2 sm:py-6 lg:px-0 lg:py-12">
      <div className="flex justify-center">
        <img src={soonImg} className="w-52 lg:w-60" alt="soon" />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Coming Soon
        </h1>
        <div className="mt-6 text-lg leading-8 text-gray-600">
          <span className="">
            Hold onto your pixels! This space is under construction and our team
            of digital architects is hard at work building something awesome.
            Stay tuned for a masterpiece in the making!
          </span>
          <IconPalette className="inline-block w-7 text-blue-primary" />
        </div>
        <Button
          onClick={() => navigate(-1)}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'mt-6 bg-blue-primary text-white hover:bg-blue-500 hover:text-white',
          )}
        >
          <IconArrowLeft />
          Back
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
