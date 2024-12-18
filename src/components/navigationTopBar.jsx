import { Box } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import classes from '@assets/css/Sidebar.module.css';
import { SidebarData } from '@utility/utils.js';

/* top container header */
export default function NavigationTopBar() {
  const location = useLocation();
  location.pathname = location.pathname === '/' ? '/home' : location.pathname;
  const pathData = SidebarData.find((f) => f.link === location.pathname);

  return (
    <Box mah={90} className="w-screen rounded p-2">
      <div className="flex items-center">
        {pathData && (
          <>
            <pathData.icon className={classes.linkIcon} stroke={1.5} />
            <span className="text-xl">{pathData.label}</span>
            <span className="invisible">this is verify</span>
          </>
        )}
      </div>
    </Box>
  );
}
