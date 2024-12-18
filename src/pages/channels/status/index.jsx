import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ChannelStatusAppData } from '@/assets/static/data';
import IntegrationService from '@/service/integrationService';
import { Button, buttonVariants } from '@components/chat/button.jsx';
import { cn, exportLogFile } from '@/utility/utils';
import { Loader, rem, ThemeIcon } from '@mantine/core';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { DASHBOARD_ROUTE_TYPES } from '@/constants/routePath';
import { useAuthContext } from '@/context/auth/authContext';

const TickIcon = () => {
  return (
    <ThemeIcon color="green" size={30} radius="xl">
      <IconCheck style={{ width: rem(16), height: rem(16) }} />
    </ThemeIcon>
  );
};

const ExclamatioIcon = () => {
  return (
    <ThemeIcon color="red" size={30} radius="xl">
      <IconExclamationMark style={{ width: rem(24), height: rem(24) }} />
    </ThemeIcon>
  );
};

const ChannelStatus = () => {
  const [searchParams] = useSearchParams();
  const { app } = useParams();
  const { selectedOrg } = useAuthContext();

  // initial indicate -> default: spinner; success: green tick; notSuccess: red exclamation mark
  const [isSuccess, setSuccess] = useState(false);
  const [isSpinner, setSpinner] = useState(true);

  // get code from query params after redirection from facebook
  const params = new URLSearchParams(document.location.search);
  let code = searchParams.get('code');
  if (code === null) {
    code = params.get('code');
  }

  // Initial data
  const data = ChannelStatusAppData.find((element) => element.app === app);

  useEffect(() => {
    let timeoutId;

    if (code && selectedOrg != null) {
      console.log('CONECT FB');
      connectFacebook();
    } else {
      setSpinner(true);
    }

    timeoutId = setTimeout(function () {
      if (isSpinner === true) {
        setSpinner(false);
        setSuccess(false);
        throw new Error('Timeout');
      }
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, [code, selectedOrg]);

  // Function to render the icon or loader based on conditions
  const renderIconOrLoader = (index) => {
    if (index !== 2) {
      return <TickIcon />;
    }
    if (isSuccess) {
      return <TickIcon />;
    }
    if (isSpinner) {
      return <Loader color="green" size={30} />;
    }
    return <ExclamatioIcon />;
  };

  // Function to render text based on conditions
  const renderText = () => {
    if (isSuccess) {
      return <Link to={DASHBOARD_ROUTE_TYPES.INBOX}>Inbox</Link>;
    }

    if (isSpinner) {
      return 'In Progress';
    }

    return 'Error';
  };

  // Function to css button background based on conditions
  const renderBtnBg = () => {
    if (isSuccess) {
      return 'bg-green-400 hover:bg-green-500';
    }

    if (isSpinner) {
      return 'bg-blue-primary hover:bg-blue-500';
    }

    return 'bg-red-500 hover:bg-red-600';
  };

  // Return exclamation mark in red when failed or tick in green when succeed
  const connectFacebook = async () => {
    setSpinner(true);
    try {
      await IntegrationService.integrateFacebook(
        code,
        selectedOrg.organization_uuid,
        import.meta.env.VITE_FB_REDIRECT_URI,
      );
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="h-full">
      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 py-4">
          <div className="flex items-center gap-x-4">
            <img src={data.image} alt="" />
            <h2 className="text-zinc-800 dark:text-zinc-100 text-2xl font-semibold">
              {data.appName}
            </h2>
          </div>
        </div>

        <div className="mt-6 flow-root">
          <ul role="list" className="-mb-8">
            {data.steps.map((element, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  <div className="relative flex items-center space-x-3">
                    {renderIconOrLoader(index)}
                    <p className="text-lg text-gray-500">{element}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="fixed bottom-0 w-11/12 px-5 py-5">
        <div className="flex">
          <Button
            disabled={isSpinner}
            onClick={exportLogFile}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'cursor-pointer bg-white text-blue-primary hover:bg-blue-primary hover:text-white',
            )}
          >
            View Logs
          </Button>
          <Button
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'ml-auto w-32 cursor-pointer text-white hover:text-white',
              renderBtnBg(),
            )}
          >
            {renderText()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelStatus;
