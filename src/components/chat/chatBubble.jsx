import React from 'react';
import { convertTimestamp } from '@utility/utils.js';

const ChatBubble = ({ src, alt, name, message, timestamp, content }) => {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

  function extractURL(message) {
    return message.replace(urlRegex, function (url) {
      return `<a href="${url}" style="color: blue;">${url}</a>`;
    });
  }

  if (content === 'text')
    return (
      <div className="flex items-start gap-2.5">
        <img className="h-8 w-8 rounded-full" src={src} alt={alt} />
        <div className="flex w-full max-w-[320px] flex-col gap-1">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {name}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {convertTimestamp(timestamp, 'alternate')}
            </span>
          </div>
          <div className="leading-1.5 flex flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
            <p
              className="break-words text-sm font-normal text-gray-900 dark:text-white"
              dangerouslySetInnerHTML={{ __html: extractURL(message) }}
            ></p>
          </div>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        </div>
      </div>
    );
  else
    return (
      <div className="flex items-start gap-2.5">
        <img className="h-8 w-8 rounded-full" src={src} alt={alt} />
        <div className="flex flex-col gap-1">
          <div className="leading-1.5 flex w-full max-w-[326px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
            <div className="mb-2 flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {name}
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {convertTimestamp(timestamp, 'alternate')}
              </span>
            </div>
            <div className="group relative my-2.5">
              <div className="absolute flex h-full w-full items-center justify-center rounded-lg bg-gray-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  data-tooltip-target="download-image"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:text-white"
                >
                  <svg
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                    />
                  </svg>
                </button>
                <div
                  id="download-image"
                  role="tooltip"
                  className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                >
                  Download image
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <img src={content} alt={alt} className="rounded-lg" />
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered
            </span>
          </div>
        </div>
      </div>
    );
};

export default ChatBubble;
