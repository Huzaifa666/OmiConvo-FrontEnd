import MessengerIcon from '@assets/images/apps/messenger.png';
import LineIcon from '@assets/images/apps/line.png';
import ViberIcon from '@assets/images/apps/viber.png';
import WhatsappIcon from '@assets/images/apps/whatsapp.png';
import InstagramIcon from '@assets/images/apps/instagram.png';
import TelegramIcon from '@assets/images/apps/telegram.png';
import ZaloIcon from '@assets/images/apps/zalo.png';
import KakaoTalkIcon from '@assets/images/apps/kakao-talk.png';
import TikTokIcon from '@assets/images/apps/tiktok.png';

const ChannelCatalogListsData = [
  {
    id: '1',
    app: 'facebook',
    appName: 'Facebook Messenger',
    image: MessengerIcon,
    text: 'Facebook Messenger is an instant messaging app and platform developed by Meta Platforms.',
    href: '/app/channels/messenger/onboarding',
  },
  {
    id: '2',
    app: 'instagram',
    appName: 'Instagram',
    image: InstagramIcon,
    text: 'Instagram is an photo and video sharing social networking service owned by Meta Platforms.',
    href: '/app/channels/instagram/onboarding',
  },
  {
    id: '3',
    app: 'whatsapp',
    appName: 'Whatsapp',
    image: WhatsappIcon,
    text: 'WhatsApp is an instant messaging and voice-over-IP service owned by Meta Platforms.',
    href: '/app/channels/whatsapp/onboarding',
  },
  {
    id: '4',
    app: 'viber',
    appName: 'VIBER',
    image: ViberIcon,
    text: 'Viber is a cross platform voice over IP and instant messaging app owned by Rakuten.',
    href: '/app/channels/viber/onboarding',
  },
  {
    id: '5',
    app: 'line',
    appName: 'LINE',
    image: LineIcon,
    text: 'Line is a freeware app for instant communications on electronic devices operated by LY Corporation.',
    href: '/app/channels/line/onboarding',
  },
  {
    id: '6',
    app: 'telegram',
    appName: 'Telegram',
    image: TelegramIcon,
    text: 'Telegram is a cloud based, cross platform, encrypted instant messaging service.',
    href: '/app/channels/telegram/onboarding',
  },
  {
    id: '7',
    app: 'zalo',
    appName: 'ZALO',
    image: ZaloIcon,
    text: 'Zalo is a free messaging and call application on mobile and desktop operated by VNG.',
    href: '/app/channels/zalo/onboarding',
  },
  {
    id: '8',
    app: 'kakaotalk',
    appName: 'Kakao Talk',
    image: KakaoTalkIcon,
    text: 'KakaoTalk is a mobile messaging app for smartphones operated by Kakao Corporation.',
    href: '/app/channels/kakaotalk/onboarding',
  },
  {
    id: '9',
    app: 'tiktok',
    appName: 'TikTok',
    image: TikTokIcon,
    text: 'TikTok is a short-form video hosting service owned by Internet company ByteDance.',
    href: '/app/channels/tiktok/onboarding',
  },
];

const ChannelOnboardingAppData = [
  {
    app: 'messenger',
    appName: 'Facebook Messenger',
    image: MessengerIcon,
    title: 'Connect OmiConvo with Facebook Messenger',
    description:
      'Efficiently manage your Facebook page messages and view all conversations in one centralized place with OmiConvo.',
    href: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${import.meta.env.VITE_FB_CLIENT_ID}&scope=${import.meta.env.VITE_FB_SCOPE}&redirect_uri=${import.meta.env.VITE_FB_REDIRECT_URI}`,
  },
  {
    id: '2',
    app: 'instagram',
    appName: 'Instagram',
    image: InstagramIcon,
    title: 'Connect OmiConvo with Instagram',
    description:
      'Efficiently manage your Facebook page messages and view all conversations in one centralized place with OmiConvo.',
    href: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${import.meta.env.VITE_FB_CLIENT_ID}&scope=${import.meta.env.VITE_INS_SCOPE}&redirect_uri=${import.meta.env.VITE_FB_REDIRECT_URI}`,
  },
  {
    id: '3',
    app: 'whatsapp',
    appName: 'Whatsapp',
    image: WhatsappIcon,
    title: 'Connect OmiConvo with Whatsapp',
    description:
      'Efficiently manage your Facebook page messages and view all conversations in one centralized place with OmiConvo.',
    href: `https://www.facebook.com/v19.0/dialog/oauth?client_id=${import.meta.env.VITE_FB_CLIENT_ID}&scope=${import.meta.env.VITE_FB_SCOPE}&redirect_uri=${import.meta.env.VITE_FB_REDIRECT_URI}`,
  },
  {
    id: '4',
    app: 'viber',
    appName: 'VIBER',
    image: ViberIcon,
    text: 'Enhance your customer communications by routing private messages from Facebook to OmiConvo. With this integration, you can efficiently manage message inquiries and have a centralized view of all Facebook profiles in one place.',
    requiredText:
      'To connect Facebook Messenger to OmiConvo, you will require the following:',
    steps: [
      'A valid Facebook account',
      'Link your Facebook page to the OmiConvo platform',
      'Grant permissions to OmiConvo for managing messages',
    ],
    href: '/app/channels/viber/status',
  },
  {
    id: '5',
    app: 'line',
    appName: 'LINE',
    image: LineIcon,
    text: 'Enhance your customer communications by routing private messages from Facebook to OmiConvo. With this integration, you can efficiently manage message inquiries and have a centralized view of all Facebook profiles in one place.',
    requiredText:
      'To connect Facebook Messenger to OmiConvo, you will require the following:',
    steps: [
      'A valid Facebook account',
      'Link your Facebook page to the OmiConvo platform',
      'Grant permissions to OmiConvo for managing messages',
    ],
    href: '/app/channels/line/status',
  },
  {
    id: '6',
    app: 'telegram',
    appName: 'Telegram',
    image: TelegramIcon,
    text: 'Enhance your customer communications by routing private messages from Facebook to OmiConvo. With this integration, you can efficiently manage message inquiries and have a centralized view of all Facebook profiles in one place.',
    requiredText:
      'To connect Facebook Messenger to OmiConvo, you will require the following:',
    steps: [
      'A valid Facebook account',
      'Link your Facebook page to the OmiConvo platform',
      'Grant permissions to OmiConvo for managing messages',
    ],
    href: '/app/channels/telegram/status',
  },
  {
    id: '7',
    app: 'zalo',
    appName: 'ZALO',
    image: ZaloIcon,
    text: 'Enhance your customer communications by routing private messages from Facebook to OmiConvo. With this integration, you can efficiently manage message inquiries and have a centralized view of all Facebook profiles in one place.',
    requiredText:
      'To connect Facebook Messenger to OmiConvo, you will require the following:',
    steps: [
      'A valid Facebook account',
      'Link your Facebook page to the OmiConvo platform',
      'Grant permissions to OmiConvo for managing messages',
    ],
    href: '/app/channels/zalo/status',
  },
  {
    id: '8',
    app: 'kakaotalk',
    appName: 'Kakao Talk',
    image: KakaoTalkIcon,
    text: 'Enhance your customer communications by routing private messages from Facebook to OmiConvo. With this integration, you can efficiently manage message inquiries and have a centralized view of all Facebook profiles in one place.',
    requiredText:
      'To connect Facebook Messenger to OmiConvo, you will require the following:',
    steps: [
      'A valid Facebook account',
      'Link your Facebook page to the OmiConvo platform',
      'Grant permissions to OmiConvo for managing messages',
    ],
    href: '/app/channels/kakaotalk/status',
  },
  {
    id: '9',
    app: 'tiktok',
    appName: 'TikTok',
    image: TikTokIcon,
    text: 'Enhance your customer communications by routing private messages from Facebook to OmiConvo. With this integration, you can efficiently manage message inquiries and have a centralized view of all Facebook profiles in one place.',
    requiredText:
      'To connect Facebook Messenger to OmiConvo, you will require the following:',
    steps: [
      'A valid Facebook account',
      'Link your Facebook page to the OmiConvo platform',
      'Grant permissions to OmiConvo for managing messages',
    ],
    href: '/app/channels/tiktok/status',
  },
];

const ChannelStatusAppData = [
  {
    id: '1',
    app: 'messenger',
    appName: 'Facebook Messenger',
    image: MessengerIcon,
    steps: [
      'Step One: User granted authorization to connect Facebook with OmiConvo.',
      'Step Two: Authorization successful to Facebook with OmiConvo.',
      'Step Three: Connecting Facebook Pages to OmiConvo.',
    ],
  },
  {
    id: '2',
    app: 'instagram',
    appName: 'Instargram',
    image: InstagramIcon,
    steps: [
      'Step One: User granted authorization to connect Facebook with OmiConvo.',
      'Step Two: Authorization successful to Facebook with OmiConvo.',
      'Step Three: Connecting Facebook Pages to OmiConvo.',
    ],
  },
];

const AppImages = [
  {
    id: 'facebook',
    appName: 'Facebook Messenger',
    image: MessengerIcon,
  },
  {
    id: 'instagram',
    appName: 'Instagram',
    image: InstagramIcon,
  },
  {
    id: 'whatsapp',
    appName: 'Whatsapp',
    image: WhatsappIcon,
  },
];

export {
  ChannelCatalogListsData,
  ChannelStatusAppData,
  ChannelOnboardingAppData,
  AppImages,
};
