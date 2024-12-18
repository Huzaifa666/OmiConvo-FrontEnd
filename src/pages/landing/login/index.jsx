/* eslint-disable prettier/prettier */
import { LandingContainerLeft } from '@/components/landing/landingContainer.jsx';
import LoginForm from '@/pages/landing/login/loginForm';
import { AUTH_ROUTE_TYPES, MISCELLANEOUS_ROUTES } from '@/constants/routePath';
import { Link } from 'react-router-dom';

const Login = () => {
  return <LandingContainerLeft>
    <h2 className="mt-8 text-lg font-semibold text-black">
      Sign in to your account
    </h2>
    <p className="mt-2 text-sm text-black">
      Don&apos;t have an account?
      <Link
        to={AUTH_ROUTE_TYPES.SIGNUP}
        className="ml-1 font-medium text-blue-primary hover:underline"
      >
        Sign up
      </Link>
    </p>

    {/* Login Form */}
    <LoginForm />

    <div className="absolute bottom-4 sm:bottom-6 md:bottom-1 md:py-5">
      <div className="flex gap-x-4">
        <Link
          to={MISCELLANEOUS_ROUTES.TERMS}
          className="text-sm text-blue-primary hover:underline"
        >
          Terms of Service
        </Link>
        <Link
          to={MISCELLANEOUS_ROUTES.PRIVACY}
          className="text-sm text-blue-primary hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          to={MISCELLANEOUS_ROUTES.CONTACT}
          className="text-sm text-blue-primary hover:underline "
        >
          Contact Us
        </Link>
      </div>
    </div>
  </LandingContainerLeft>;
};

export default Login;
