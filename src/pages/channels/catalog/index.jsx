import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utility/utils';
import { Button, buttonVariants } from '@components/chat/button.jsx';
import { ChannelCatalogListsData } from '@/assets/static/data';
import { useSetState } from '@mantine/hooks';
import { useEffect } from 'react';
import InstalledLists from '@pages/channels/catalog/installedLists';
import { useAuthContext } from '@/context/auth/authContext';
import { useLocation } from 'react-router-dom';

const tabs = [{ name: 'All Integrations' }, { name: 'Installed' }];

const Channels = () => {
  const navigate = useNavigate();
  const [state, setState] = useSetState({
    isLoading: false,
    catalogLists: ChannelCatalogListsData,
    panelIndex: 0,
    isDialogOpen: false,
    isBtnClicked: false,
    isNavigate: false,
    installedLists: [],
    selectedInstalledData: [],
    selectedInstalledIndex: 0,
  });

  return (
    <div className="my-2 h-full px-4 sm:px-6 lg:px-8">
      <div className="mb-2 lg:mb-5">
        {/* Mobile responsive tab panel */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            onChange={(e) => setState({ panelIndex: parseInt(e.target.value) })}
          >
            {tabs.map((tab, index) => (
              <option key={index} value={index}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>

        {/* Static tab panel */}
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setState({ panelIndex: index })}
                className={cn(
                  index === state.panelIndex
                    ? 'border-blue-primary text-blue-primary'
                    : 'border-transparent text-gray-500 hover:border-blue-primary hover:text-blue-primary',
                  'whitespace-nowrap border-b-4 px-1 py-2 text-sm font-medium',
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {state.panelIndex === 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {state.catalogLists.map((element, index) => (
            <li
              key={index}
              className="group relative flex flex-col items-start rounded-lg border p-4 shadow-md"
            >
              <div className="flex items-center gap-x-4">
                <img src={element.image} width={40} alt="" />
                <h2 className="text-zinc-800 dark:text-zinc-100 text-xl font-semibold">
                  {element.appName}
                </h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 relative z-10 mb-3 mt-6 text-sm">
                {element.text}
              </p>
              <p className="mb-4 w-full border border-solid border-gray-100"></p>
              <Button
                onClick={() => navigate(element.href)}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'ml-auto cursor-pointer border border-blue-500 text-blue-primary hover:bg-blue-primary hover:text-white',
                )}
              >
                Connect
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <InstalledLists state={state} setState={setState} />
      )}
    </div>
  );
};

export default Channels;
