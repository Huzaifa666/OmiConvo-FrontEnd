import React, { useEffect } from 'react';
import { profileFetch$ } from '@/service/messageService.js';
import { from, mergeMap, toArray } from 'rxjs';
import FilterBar from '@pages/chat/filterBar.jsx';
import { useSetState } from '@mantine/hooks';
import { useAuthContext } from '@/context/auth/authContext.jsx';
import IntegrationService from '@/service/integrationService.js';
import { Loader } from '@components/loader.jsx';
import GetStarted from '@pages/getstarted/index.jsx';
import { ChatContextProvider } from '@/hooks/customHooks.jsx';
import { useChatStore } from '@/store/store.js';

const Index = () => {
  const { selectedOrg } = useAuthContext();
  const resetStore = useChatStore((state) => state.reset);
  const [state, setState] = useSetState({
    load: false,
    integrationLists: [],
  });
  useEffect(() => {
    if (selectedOrg?.organization_uuid) {
      resetStore();
      const getInstalledLists = async () => {
        const result = await IntegrationService.getInstalledLists(
          selectedOrg.organization_uuid,
        );
        if (!result.error) {
          return result;
        }
      };
      getInstalledLists().then((result) => {
        from(result)
          .pipe(
            mergeMap((integration) =>
              profileFetch$(
                integration.platform_id,
                integration.platform_id,
                selectedOrg.organization_uuid,
              ),
            ),
            toArray(),
          )
          .subscribe({
            next: (res) => setState({ integrationLists: res }),
            complete: () => {
              setState({ load: true });
            },
          });
      });
    }
  }, [selectedOrg]);

  if (state.integrationLists.length === 0 && state.load) return <GetStarted />;
  else if (state.load)
    return (
      <ChatContextProvider>
        <div className="h-full">
          <div className="h-full">
            <div className="flex h-full items-start">
              <FilterBar integrationLists={state.integrationLists} />
            </div>
          </div>
        </div>
      </ChatContextProvider>
    );
  else
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader width={500} />
      </div>
    );
};

export default Index;
