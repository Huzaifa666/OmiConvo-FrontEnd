import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChannelOnboardingAppData } from '@/assets/static/data';
import { Button, buttonVariants } from '@components/chat/button.jsx';
import { cn } from '@/utility/utils';
import InboxImg from '@/assets/images/img-inbox.png';
import BackgroundIntegrationOnboard from '@/assets/images/bg-IntegrationOnboard.png';

const ChannelOnboarding = () => {
  const { app } = useParams();
  const data = ChannelOnboardingAppData.find((element) => element.app === app);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute -z-20 h-full w-full">
        <img
          src={BackgroundIntegrationOnboard}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="max-w-8xl mx-auto px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-10">
        <div className="mx-auto flex max-w-2xl flex-col justify-center lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <div className="flex items-center gap-x-4">
            <img src={data.image} width={50} alt="" />
            <h2 className="text-zinc-800 dark:text-zinc-100 text-2xl font-semibold">
              {data.appName}
            </h2>
          </div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-4xl">
            {data.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {data.description}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button
              onClick={() => {
                const url = data.href;
                console.log(`redirecting too: ${url}`);
                window.location.replace(url);
              }}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'cursor-pointer bg-blue-primary text-white hover:bg-blue-500 hover:text-white',
              )}
            >
              Continue
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-6xl">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src={InboxImg}
                alt="Oc Inbox"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelOnboarding;
