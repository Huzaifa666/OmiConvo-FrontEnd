import { Sidebar } from 'flowbite-react';
import { cn } from '@utility/utils.js';
import {
  IconArchive,
  IconCheck,
  IconFlag2,
  IconInbox,
  IconMessage2Exclamation,
} from '@tabler/icons-react';
import React, { useEffect, useMemo } from 'react';
import { useSetState } from '@mantine/hooks';
import { initialFetch$ } from '@/service/messageService.js';
import { useAuthContext } from '@/context/auth/authContext.jsx';
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import { of, switchMap } from 'rxjs';
import { chatContext } from '@/hooks/customHooks.jsx';
import ChatPlaceHolder from '@components/chat/chatPlaceHolder.jsx';
import { useChatStore } from '@/store/store.js';
import { ChatLayout } from '@pages/chat/chatLayout.jsx';

const FilterBar = function ({ integrationLists }) {
  const { selectedOrg } = useAuthContext();
  const { pageProfile, chats, setChatState } = chatContext();
  const updateUser = useChatStore((state) => state.updateUser);
  const unread = useChatStore((state) => state.unread);
  const resolved = useChatStore((state) => state.resolved);
  const followUp = useChatStore((state) => state.followUp);
  const archived = useChatStore((state) => state.archived);
  const resetStore = useChatStore((state) => state.reset);
  const [filterState, setFilterState] = useSetState({
    selectedItem: '',
    integrations: [],
    selectedOption: '',
  });
  const usersList = useChatStore((state) => state.usersList);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const items = [
    {
      name: 'All',
      icon: IconInbox,
      data: pageProfile?.name ? usersList[pageProfile.id] : [],
    },
    {
      name: 'New',
      icon: IconMessage2Exclamation,
      data: unread,
    },
    {
      name: 'Resolved',
      icon: IconCheck,
      data: resolved,
    },
    {
      name: 'Follow Up',
      icon: IconFlag2,
      data: followUp,
    },
    {
      name: 'Archived',
      icon: IconArchive,
      data: archived,
    },
  ];

  const getIntegrations = () => {
    return integrationLists.map((value, index) => {
      return (
        <Combobox.Option
          key={index}
          value={value}
          className="flex cursor-pointer gap-2 rounded-lg pl-2 pr-4 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img
            className="h-8 w-8 rounded-full"
            src={value.avatar}
            alt={value.name}
          />
          <span className="text-sm">{value.name}</span>
        </Combobox.Option>
      );
    });
  };

  const integrations = useMemo(() => getIntegrations(), [integrationLists]);

  useEffect(() => {
    setFilterState({ integrations });
    setChatState({ chats: usersList });
  }, [integrationLists, usersList, unread]);

  const onSelectPage = (page) => {
    resetStore();
    const initialFetch = initialFetch$(
      page,
      selectedOrg.organization_uuid,
    ).pipe(switchMap((res) => of(res)));
    initialFetch.subscribe({
      next: (user) => {
        updateUser(user);
      },
      complete: () => {
        setFilterState({
          selectedItem: {
            name: 'All',
            icon: IconInbox,
            data: usersList,
          },
        });
        setChatState({
          pageProfile: page,
        });
      },
    });
  };

  const returnMessage = () => {
    if (!pageProfile?.id) {
      return 'Select Platform From Dropdown';
    } else {
      return 'There are no chats';
    }
  };

  return (
    <>
      <div>
        <Sidebar className="!bg-white">
          <div className="flex h-full flex-col justify-between">
            <div>
              <Combobox
                store={combobox}
                className="pt-1"
                onOptionSubmit={(val) => {
                  onSelectPage(val);
                  setFilterState({ selectedOption: val.name });
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                  >
                    {filterState.selectedOption || (
                      <Input.Placeholder>Select Platform</Input.Placeholder>
                    )}
                  </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                  <Combobox.Options>
                    {filterState.integrations}
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              <Sidebar.Items className="pt-4">
                <Sidebar.ItemGroup>
                  {items.map((item, index) => {
                    return (
                      <Sidebar.Item
                        className={cn(
                          'cursor-pointer hover:bg-blue-50',
                          filterState.selectedItem.name === item.name
                            ? 'bg-blue-50'
                            : '',
                          item.data && item.data.length === 0
                            ? 'pointer-events-none opacity-50'
                            : '',
                        )}
                        key={index}
                        icon={item.icon}
                        onClick={() => {
                          setChatState({
                            chats: { [pageProfile?.id]: item.data },
                          });
                          setFilterState({ selectedItem: item });
                        }}
                        label={
                          <span
                            className={cn(
                              item.data &&
                                item.data &&
                                item.data.length > 0 &&
                                'inline-block h-5 w-5 rounded-full bg-red-400 pt-0.5 text-center text-white',
                              !(item.data && item.data.length > 0) && 'hidden',
                            )}
                          >
                            {item.data && item.data.length}
                          </span>
                        }
                      >
                        {item.name}
                      </Sidebar.Item>
                    );
                  })}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </div>
        </Sidebar>
      </div>
      {pageProfile?.id && chats[pageProfile?.id] ? (
        // <Suspense fallback={<Loader />}>
        <ChatLayout />
      ) : (
        // </Suspense>
        <ChatPlaceHolder message={returnMessage()} />
      )}
    </>
  );
};

export default FilterBar;
