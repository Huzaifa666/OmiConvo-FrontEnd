import React from 'react';
import { Switch } from '@headlessui/react';
import { cn } from '@/utility/utils';
import { AppImages } from '@/assets/static/data';
import { InfoDialog, WarningDialog } from '@/components/dialogMessage';
import IntegrationService from '@/service/integrationService';
import { IconInfoCircle } from '@tabler/icons-react';
import { Button, buttonVariants } from '@/components/chat/button';
import { useAuthContext } from '@/context/auth/authContext';
import { useEffect } from 'react';
import { Loader } from '@/components/loader';

const InstalledLists = ({ state, setState }) => {
  const { selectedOrg } = useAuthContext();
  const appData = state.installedLists.map((element) => ({
    ...element,
    ...AppImages.find((app) => app.id === element.platform_type),
  }));

  useEffect(() => {
    getInstalledLists();
  }, []);

  // Get Integration list by passing the global state of orgUuid
  const getInstalledLists = async () => {
    try {
      setState({ loading: true });
      const result = await IntegrationService.getInstalledLists(
        selectedOrg.organization_uuid,
      );
      if (!result.error) {
        setState((prevState) => ({
          ...prevState,
          installedLists: result,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState({ loading: false });
    }
  };

  // Pop up dialog message before activate/deactive
  const handleOnChange = (e, index) => {
    setState((prevState) => ({
      ...prevState,
      isDialogOpen: true,
      selectedInstalledData: state.installedLists[index],
      selectedInstalledIndex: index,
    }));
  };

  // Insert enabled (true/false) to the index element of the installed lists
  // After that, re-render the installed lists
  const handleOnSubmit = async (data, index) => {
    try {
      setState({ isBtnClicked: true });
      const integUuid = data.uuid;
      const result = await IntegrationService.setActiveInstalled(
        selectedOrg.organization_uuid,
        integUuid,
      );
      if (result) {
        state.installedLists[index].enabled = result.enabled;
        setState({ isDialogOpen: false });
      }
    } catch (error) {
      setState({ isDialogOpen: false });
      console.error('Error:', error.message);
    } finally {
      setState({ isBtnClicked: false });
    }
  };

  return (
    <>
      {state.loading ? (
        <div className="mx-auto flex min-h-screen items-center justify-center">
          <Loader width={100} />
        </div>
      ) : appData.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-100">
          {appData.map((element, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="bg-gray-50 h-12 w-12 flex-none rounded-full"
                  src={element.image}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {element.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {element.appName}
                  </p>
                </div>
              </div>
              <div className="my-auto flex shrink-0 flex-col items-end">
                <Switch
                  checked={element.enabled}
                  onChange={(e) => handleOnChange(e, index, element.uuid)}
                  className={cn(
                    element.enabled ? 'bg-blue-primary' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className={cn(
                      element.enabled ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    )}
                  >
                    <span
                      className={cn(
                        element.enabled
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                      )}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={cn(
                        element.enabled
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out',
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                      )}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Switch>
              </div>
            </li>
          ))}
          {state.isDialogOpen && state.selectedInstalledData.enabled ? (
            <WarningDialog
              open={state.isDialogOpen}
              onClose={() => setState({ isDialogOpen: false })}
              onClick={() =>
                handleOnSubmit(
                  state.selectedInstalledData,
                  state.selectedInstalledIndex,
                )
              }
              disabled={state.isBtnClicked}
              selectedInstalledData={state.selectedInstalledData}
              title={`Deactivate ${state.selectedInstalledData.name}`}
              description={`Are you sure you want to deactivate ${state.selectedInstalledData.name}?`}
              onSubmitBtnText="Deactivate"
            />
          ) : (
            <InfoDialog
              open={state.isDialogOpen}
              onClose={() => setState({ isDialogOpen: false })}
              onClick={() =>
                handleOnSubmit(
                  state.selectedInstalledData,
                  state.selectedInstalledIndex,
                )
              }
              disabled={state.isBtnClicked}
              selectedInstalledData={state.selectedInstalledData}
              title={`Activate ${state.selectedInstalledData.name}`}
              description={`Are you sure you want to activate ${state.selectedInstalledData.name}?`}
              onSubmitBtnText="Activate"
            />
          )}
        </ul>
      ) : (
        <div className="flex min-h-96 w-full flex-col items-center justify-center">
          <div className="mx-auto mb-4 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0">
            <IconInfoCircle
              className="h-16 w-16 text-blue-primary"
              aria-hidden="true"
            />
          </div>
          <h2 className="py-4 text-center text-2xl font-bold">
            No integration has been created yet
          </h2>
          <p className="pb-6 text-center">
            Click on <b className="text-blue-primary">Connect</b> to start your
            first integration.
          </p>
          <Button
            onClick={() => setState({ panelIndex: 0 })}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'cursor-pointer bg-blue-primary text-white hover:bg-blue-500 hover:text-white ',
            )}
          >
            Connect
          </Button>
        </div>
      )}
    </>
  );
};

export default InstalledLists;
