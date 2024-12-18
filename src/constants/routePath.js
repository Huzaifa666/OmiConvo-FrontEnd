export const AUTH_ROUTE_TYPES = {
  SIGNUP: '/signup',
  VERIFY: '/verify',
  LOGIN: '/login',
  FORGOTPWD: '/forgot',
};

export const DASHBOARD_ROUTE_TYPES = {
  ONBOARDING: '/onboarding',
  GETSTARTED: '/app/getstarted',
  HOME: '/app/home',
  INBOX: '/app/inbox',
  MARKETING: '/app/marketing',
  SUBSCRIBERS: '/app/subscribers',
  CHANNELS: '/app/channels',
  CHANNELS_ONBOARDING: '/app/channels/:app/onboarding',
  CHANNELS_STATUS: '/app/channels/:app/status',
};

export const MISCELLANEOUS_ROUTES = {
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  NOTFOUND: '/notfound',
};

export const SIDEBAR_ROUTES_INDEX = {
  '/app/home': 0,
  '/app/inbox': 1,
  '/app/marketing': 2,
  '/app/subscribers': 3,
  '/app/channels': 4,
};
