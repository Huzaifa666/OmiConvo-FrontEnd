import { useEffect, useState } from 'react';
import { Tooltip } from '@mantine/core';
import logo from '@assets/images/logo-logoOnly.png';
import { useNavigate } from 'react-router-dom';
import { cn, SidebarData } from '@/utility/utils';
import { SIDEBAR_ROUTES_INDEX } from '@/constants/routePath';

export default function NavigationSidebar({
  sidebarOpen,
  setSidebarOpen,
  locationPathName,
}) {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setActive(SIDEBAR_ROUTES_INDEX[locationPathName]);
  }, [locationPathName]);

  function NavbarLink({ icon: Icon, label, active, onClick }) {
    return (
      <>
        {sidebarOpen ? (
          <a
            onClick={onClick}
            className={cn(
              active
                ? // TODO: need to use official colors
                  'bg-blue-primary text-white'
                : 'text-gray-400 hover:bg-blue-primary hover:text-white',
              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
            )}
          >
            {Icon && <Icon className="h-6 w-6 shrink-0" stroke={1.5} />}
            {label}
          </a>
        ) : (
          <Tooltip
            className="z-50"
            label={label}
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <button
              onClick={onClick}
              className={cn(
                active
                  ? 'bg-blue-primary text-white'
                  : 'text-gray-500 hover:bg-blue-primary hover:text-white',
                'group flex gap-x-3 rounded-lg p-3 text-sm font-semibold leading-6',
              )}
            >
              {Icon && <Icon className="h-6 w-6 shrink-0" stroke={1.5} />}
              <span className="sr-only">{label}</span>
            </button>
          </Tooltip>
        )}
      </>
    );
  }

  const routeToPage = (route) => {
    navigate(route.link);
    {
      sidebarOpen ? setSidebarOpen(!sidebarOpen) : null;
    }
  };

  const links = SidebarData.map((link, index) => {
    if (link.visible)
      return (
        <li key={index}>
          <NavbarLink
            {...link}
            active={index === active}
            onClick={() => {
              setActive(index);
              routeToPage(link);
            }}
          />
        </li>
      );
  });

  return (
    <>
      <div
        className={`flex h-16 shrink-0 items-center ${sidebarOpen ? '' : 'justify-center'}`}
      >
        <img className="h-8 w-auto" src={logo} alt="OmiConvo" />
      </div>
      {sidebarOpen ? (
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="-mx-2 flex-1 space-y-1">
            {links}
          </ul>
        </nav>
      ) : (
        <>
          <nav className="mt-4">
            <ul className="flex flex-col items-center space-y-1">{links}</ul>
          </nav>
        </>
      )}
    </>
  );
}
