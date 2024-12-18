import React from 'react';
import { Dropdown } from 'flowbite-react';
import { IconMenu2 } from '@tabler/icons-react';

const DrawerDropDown = function ({ items, onClick }) {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="cursor-pointer rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Apps</span>
          <IconMenu2 className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </span>
      }
    >
      <div>
        <div className="grid grid-cols-8 gap-4 p-2">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="col-span-8 flex cursor-pointer gap-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => onClick(index)}
              >
                <item.icon className="h-6 w-6 text-gray-500 dark:text-white" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Dropdown>
  );
};

export default DrawerDropDown;
