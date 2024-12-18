/* eslint-disable prettier/prettier */
import { useNavigate, useSearchParams } from 'react-router-dom';
import EmailLogo from '@/assets/images/logo-verify.png';
import { AUTH_ROUTE_TYPES, MISCELLANEOUS_ROUTES } from '@/constants/routePath';
import { useEffect } from 'react';
import AuthService from '@/service/authService';
import { Link } from 'react-router-dom';
import { IconCheck } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import LandingButton from '@/components/landing/landingButton';
import { cn } from '@/utility/utils';
import TitleLogo from '@/components/landing/titleLogo';
import { LandingContainerCenter } from '@/components/landing/landingContainer';
import { Loader } from '@/components/loader';
import { useSetState } from '@mantine/hooks';

const DefaultLayout = ({ email }) => {
  return (
    <>
      <div className="flex w-full items-center justify-center text-center md:py-2">
        <img src={EmailLogo} width={100} alt="emailLogo" />
      </div>

      <p className="text-center text-h4 font-semibold">Verify Your Email</p>
      <p className="px-0 py-4 text-center text-xs text-gray-500 md:py-2 xl:px-6">
        Email sent to
        <b className="mx-1 font-semibold text-black">
          {email}
          <span className="font-normal">.</span>
        </b>
        Please check your inbox for verification and follow the provided link.
        If you can’t find the email, try checking your spam or junk folder.
      </p>
    </>
  );
};

const VerifyLayout = ({ email, isLoading, isEmailVerify, navigate }) => {
  return (
    <>
      {isLoading ? (
        // Loading Layout
        <div className="mt-10 text-center">
          <div className="mx-auto w-20">
            <Loader />
          </div>

          <p className="mt-4 text-black">We are verifying your account.</p>
        </div>
      ) : (
        // Verification email layout
        <>
          <div className="mt-6 flex w-full items-center justify-center text-center md:py-2">
            <div
              className={cn(
                'rounded-full',
                isEmailVerify ? 'bg-green-500' : 'bg-red-500',
              )}
            >
              {isEmailVerify ? (
                <IconCheck size={80} color="white" className="p-4" />
              ) : (
                <IconX size={80} color="white" className="p-4" />
              )}
            </div>
          </div>
          <p className="mt-2 text-center text-h4 font-semibold">
            {isEmailVerify ? 'Your account is verified' : 'Verification Failed'}
          </p>

          {isEmailVerify ? (
            <>
              <p className="mb-10 mt-2 text-center text-sm text-gray-500">
                The address<b className="mx-1 text-black">{email}</b>is now a
                confirmed account. Thanks for helping us keep your Omiconvo
                account secure.
              </p>
              <LandingButton
                text="Continue"
                onClick={() => navigate(AUTH_ROUTE_TYPES.LOGIN)}
                className="col-span-full mx-auto mt-5 flex w-full justify-center"
              />
            </>
          ) : (
            <>
              <p className="mb-10 mt-2 text-center text-sm text-gray-500">
                Sorry, we could not verify your account.
              </p>
            </>
          )}
        </>
      )}
    </>
  );
};

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useSetState({
    isEmailVerify: false,
    isLoading: false,
    isDefault: true,
    email: localStorage.getItem('email') || 'example@gmail.com',
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setState({ isLoading: true, isDefault: false });
        await AuthService.verifyEmail(token);
        setState({ isLoading: false, isEmailVerify: true });
      } catch (error) {
        setState({ isLoading: false, isEmailVerify: false });
      }
    };
    const token = searchParams.get('token');
    if (token !== null) {
      verifyEmail();
    }else {
      setState({isDefault: true})
    }
  }, [searchParams]);

  const navigateTo = (pathname) => {
    navigate({
      pathname,
    });
  };

  return (
    <>
      <LandingContainerCenter>
        <div className="flex justify-center">
          <TitleLogo />
        </div>
        {state.isDefault ? (
          <DefaultLayout email={state.email} />
        ) : (
          <VerifyLayout
            email={state.email}
            isLoading={state.isLoading}
            isEmailVerify={state.isEmailVerify}
            navigate={navigateTo}
          />
        )}

        {!state.isEmailVerify && !state.isLoading && (
          <div className="my-2 flex justify-center text-xs text-gray-500">
            <p>Need some help?</p>
            <Link
              className="mx-1 text-blue-primary hover:underline"
              to={MISCELLANEOUS_ROUTES.CONTACT}
            >
              Contact Support
            </Link>
          </div>
        )}
      </LandingContainerCenter>
    </>
  );
};

export default Verify;
