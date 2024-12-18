import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DASHBOARD_ROUTE_TYPES } from '@/constants/routePath.js';
import {
  IconBrandGoogleHome,
  IconBuildingStore,
  IconLayoutDashboard,
  IconMessages,
  IconUsersGroup,
} from '@tabler/icons-react';

dayjs.extend(utc);

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const timeFormat = 'HH:mm:ss';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function fetchToday() {
  return dayjs().valueOf();
}

export function convertTimestamp(timestamp, type = 'default') {
  const localDayjs = dayjs(timestamp);
  return type === 'alternate'
    ? localDayjs.format(timeFormat)
    : localDayjs.format(dateFormat);
}

export function convertTimestampUTC(timestamp) {
  return dayjs(timestamp).utc().format(dateFormat);
}

export function currentDayMinusSevenDays() {
  return dayjs().subtract(7, 'day').valueOf();
}

export const checkName = (name) => {
  const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (name === null || name === undefined) return true;
  else return name.match(nameRegex) == null;
};

export const getFallbackProfile = (initial) => {
  return `https://ui-avatars.com/api/?name=${initial}&rounded=true&size=128`;
};

export const validateField = (
  fieldType,
  fieldName,
  value,
  requirements,
  errMessage,
) => {
  switch (fieldType) {
    case 'text':
      if (!value.trim()) {
        return `${fieldName} cannot be empty`;
      }

      if (!requirements.test(value)) {
        return `${errMessage}`;
      }
      break;
    case 'email':
      if (!value.trim()) {
        return `${fieldName} cannot be empty`;
      }

      if (!requirements.test(value)) {
        return 'Please enter a valid email address. Ex: omiconvo@example.com';
      }
      break;
    case 'password':
      if (!value.trim()) {
        return 'Password cannot be empty';
      }
      if (requirements < 100) {
        return 'Password does not meet the requirements';
      }
      break;
    case 'checkbox':
      if (!value) {
        return 'Please check the agreement';
      }
      break;
    default:
      break;
  }
  return null;
};

export function getPasswordStrength(requirements, password) {
  let multiplier = 0;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / requirements.length) * multiplier, 0);
}

export function getPasswordColorStrength(passwordStrength) {
  if (passwordStrength === 100) {
    return 'teal';
  }

  if (passwordStrength > 40 && passwordStrength < 100) {
    return 'yellow';
  }

  return 'red';
}

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function isSmallScreen() {
  return isBrowser() && window.innerWidth < 768;
}

export function exportLogFile() {
  const currentDate = dayjs();
  const formattedDate = currentDate.format('YYYYMMDD');

  const element = document.createElement('a');
  const text = 'WELCOME TO OMICONVO LOG FILE';
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `omiconvo_logfile_${formattedDate}.txt`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

export const SidebarData = [
  {
    link: DASHBOARD_ROUTE_TYPES.HOME,
    label: 'Home',
    icon: IconBrandGoogleHome,
    visible: true,
  },
  {
    link: DASHBOARD_ROUTE_TYPES.INBOX,
    label: 'Inbox',
    icon: IconMessages,
    visible: true,
  },
  {
    link: DASHBOARD_ROUTE_TYPES.MARKETING,
    label: 'Marketing',
    icon: IconBuildingStore,
    visible: true,
  },
  {
    link: DASHBOARD_ROUTE_TYPES.SUBSCRIBERS,
    label: 'Subscribers',
    icon: IconUsersGroup,
    visible: true,
  },
  {
    link: DASHBOARD_ROUTE_TYPES.CHANNELS,
    label: 'Channels',
    icon: IconLayoutDashboard,
    visible: true,
  },
  {
    link: DASHBOARD_ROUTE_TYPES.CHANNELS_ONBOARDING,
    label: 'ChannelOnboarding',
    visible: false,
  },
  {
    link: DASHBOARD_ROUTE_TYPES.CHANNELS_STATUS,
    label: 'ChannelStatus',
    visible: false,
  },
];
