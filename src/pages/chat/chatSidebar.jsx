import { IconSearch } from '@tabler/icons-react';
import { cn, getFallbackProfile } from '@utility/utils.js';
import { buttonVariants } from '@components/chat/button.jsx';
import { TextInput, Tooltip } from 'flowbite-react';
import React from 'react';
import { chatContext } from '@/hooks/customHooks.jsx';

export function Sidebar({ links, isCollapsed, setState }) {
  const { pageProfile } = chatContext();

  function handleClick(user) {
    setState({ selectedUser: user });
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className="group relative flex h-full flex-col gap-4 overflow-y-scroll rounded-br-none rounded-tr-none p-0 scrollbar data-[collapsed=true]:p-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <form className="pb-3 pt-3">
          <TextInput
            icon={IconSearch}
            type="search"
            placeholder="Search"
            required
            onChange={(event) => setState({ search: event.target.value })}
            size={32}
          />
        </form>
        {/*  */}
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip className="z-100" key={index} content={link.name}>
              <div
                onClick={() => handleClick(link)}
                className={cn(
                  buttonVariants({ variant: link.variant, size: 'icon' }),
                  'h-11 w-11 cursor-pointer md:h-16 md:w-16',
                  link.variant === 'grey' &&
                    'dark:hover: dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted ',
                )}
              >
                <img
                  className="h-10 w-10 rounded-full bg-light-grey"
                  src={link.avatar ? link.avatar : getFallbackProfile('G')}
                  alt="Rounded avatar"
                />
                <span className="sr-only">{link.name}</span>
              </div>
            </Tooltip>
          ) : (
            <div
              key={index}
              onClick={() => handleClick(link)}
              className={cn(
                'cursor-pointer',
                buttonVariants({ variant: link.variant, size: 'xl' }),
                link.variant === 'grey' &&
                  'dark: dark:hover:  shrink dark:bg-muted  dark:hover:bg-muted',
                'h-[127px] justify-start gap-4 truncate',
              )}
            >
              <img
                className="h-10 w-10 rounded-full bg-light-grey"
                src={link.avatar ? link.avatar : getFallbackProfile('G')}
                alt="Rounded avatar"
              />
              <div className="items-between flex max-w-32 flex-col">
                <div className="p-1 pb-0">
                  <span className="max-w-32">{link.name}</span>
                </div>
                <span className="p-1 text-xs text-gray-500">
                  Facebook Messenger from {pageProfile.name}
                </span>
                {link.messages.length > 0 && (
                  <span className="p-1 text-xs">
                    {link.messages[link.messages.length - 1].name}:{' '}
                    {link.messages[link.messages.length - 1].message}
                  </span>
                )}
              </div>
            </div>
          ),
        )}
      </nav>
    </div>
  );
}
