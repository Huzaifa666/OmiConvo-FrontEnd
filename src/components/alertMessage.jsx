import { IconCircleX } from '@tabler/icons-react';
import React from 'react';

export const ErrorMessage = ({ errMsg }) => {
  return (
    <div className="col-span-full rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <IconCircleX className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">{errMsg}</div>
        </div>
      </div>
    </div>
  );
};
