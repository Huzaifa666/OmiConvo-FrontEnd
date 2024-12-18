import TitleLogo from '@/components/landing/titleLogo';
import BackgroundVerify from '@assets/images/bg-verify.png';
import { useLocation } from 'react-router-dom';
import BackgroundOrgOnboard from '@assets/images/bg-orgOnboard.png';
import BackgroundAuth from '@assets/images/bg-auth.png';
import { AUTH_ROUTE_TYPES } from '@/constants/routePath';
import { cn } from '@/utility/utils';

const BackgroundImage = ({ className, bgImg }) => {
  return (
    <div className={cn('hidden', className)}>
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={bgImg}
        alt="background-img"
      />
    </div>
  );
};

export const LandingContainerLeft = ({ children }) => {
  const location = useLocation();
  const hasRoute =
    location.pathname === AUTH_ROUTE_TYPES.LOGIN ||
    location.pathname === AUTH_ROUTE_TYPES.SIGNUP;

  return (
    <div className="relative flex min-h-screen shrink-0 justify-center md:px-20 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden bg-white px-4 py-10 shadow-2xl sm:justify-center">
        <main className="mx-auto w-full max-w-md sm:px-4 md:max-w-md md:px-0 lg:max-w-lg lg:px-10">
          <TitleLogo />
          {children}
        </main>
      </div>
      <BackgroundImage
        bgImg={BackgroundAuth}
        className="sm:contents lg:relative lg:block lg:flex-1"
      />
    </div>
  );
};

export const LandingContainerCenter = ({ children }) => {
  const location = useLocation();
  const verify = location.pathname === AUTH_ROUTE_TYPES.VERIFY;

  return (
    <div
      className={cn(
        'relative flex min-h-screen',
        verify
          ? 'items-center sm:justify-center'
          : 'justify-center py-10 sm:items-center md:py-0',
      )}
    >
      <div
        className={cn(
          'relative z-10 flex rounded-xl bg-white px-4 md:items-center lg:shadow-2xl',
          verify
            ? 'mx-auto py-5 pt-10 md:min-h-[450px] md:w-1/2 xl:w-1/3'
            : 'py-0 md:mx-auto md:min-h-[600px] md:w-2/3 xl:justify-center',
        )}
      >
        <main
          className={cn(
            'mx-auto max-w-md lg:max-w-lg',
            verify
              ? 'px-6 md:px-10'
              : 'w-full sm:px-6 md:px-6 xl:w-10/12 xl:max-w-6xl',
          )}
        >
          {children}
        </main>
      </div>

      <BackgroundImage
        bgImg={verify ? BackgroundVerify : BackgroundOrgOnboard}
        className="absolute inset-0 md:block"
      />
    </div>
  );
};
