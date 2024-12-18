import { AUTH_ROUTE_TYPES } from '@/constants/routePath';
import { LandingContainerLeft } from '@/components/landing/landingContainer.jsx';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './registerForm';
import { Link } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  const navigateTo = (pathname) => {
    navigate({
      pathname: pathname,
    });
  };

  return (
    <>
      <LandingContainerLeft>
        <h2 className="mt-8 text-lg font-semibold text-gray-900">
          Get started for free
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Already registered?
          <Link
            to={AUTH_ROUTE_TYPES.LOGIN}
            className="mx-1 font-medium text-blue-primary hover:underline"
          >
            Sign in
          </Link>
          to your account.
        </p>

        <RegisterForm navigate={navigateTo} />
      </LandingContainerLeft>
    </>
  );
};

export default Registration;
