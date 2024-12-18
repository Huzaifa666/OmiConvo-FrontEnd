import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import NavigationSidebar from '@components/navigationSidebar.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/context/auth/authContext';
import { IconUser } from '@tabler/icons-react';
import { IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE_TYPES } from '@/constants/routePath';
import { SidebarData } from '@utility/utils.js';

export default function AppShell() {
  const { setAppState } = useAuthContext();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stateLoaded, setStateLoaded] = useState(true);
  const location = useLocation();
  location.pathname = location.pathname === '/' ? '/home' : location.pathname;
  const url = location.pathname.split('/').filter(Boolean);
  const pathData = SidebarData.find((f) => f.link === '/app/' + url[1]);

  return (
    <>
      <div>
        {/* Transition effect for mobile responsive navbar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-100 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-100 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  {/* Mobile responsive navbar */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-2 ring-1 ring-white/10">
                    <NavigationSidebar
                      locationPathName={pathData.link}
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static navbar */}
        <div className="border-grey-200 hidden border-r bg-white shadow-sm lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:pb-4">
          <NavigationSidebar
            locationPathName={pathData.link}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* NavigationSidebar for mobile responsive */}
        <div className="lg:pl-20">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              {/* Appshell header */}
              <div className="relative flex flex-1">
                {/* Header icon */}
                <div className="flex">
                  {pathData && (
                    <>
                      <pathData.icon
                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-6 text-gray-500"
                        stroke={1.5}
                      />
                      <div className="block h-full w-full border-0 bg-transparent py-4 pl-10 pr-0 text-black sm:text-sm">
                        {/* Header description */}
                        <h3 className="text-lg font-semibold leading-8">
                          {pathData.label}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bell icon for notifications */}
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-100"
                      src="/omiconvo.png"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Devin
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        <div className="flex flex-col gap-y-1 px-3">
                          <Link
                            to="#"
                            className="flex flex-col px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                          >
                            <div className="flex gap-x-2">
                              <IconUser width={18} />
                              <p>Your Profile</p>
                            </div>
                          </Link>
                          <span className="block h-1 w-full border-b-2" />
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div className="flex flex-col gap-y-1 px-3 py-1">
                          <button
                            onClick={() => {
                              setAppState({
                                email: null,
                                isAuthenticated: null,
                                organizations: [],
                                selectedOrg: null,
                              });
                              localStorage.removeItem('jwt');
                              navigate(AUTH_ROUTE_TYPES.LOGIN);
                            }}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
                          >
                            <div className="flex gap-x-2">
                              <IconLogout width={18} />
                              <p>Log out</p>
                            </div>
                          </button>
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Insert your main component here */}
          <main className="h-sidebar-screen">
            <Outlet context={[setStateLoaded, stateLoaded]} />
          </main>
        </div>
      </div>
    </>
  );
}
