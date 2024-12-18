import { LandingContainerLeft } from '@/components/landing/landingContainer';
import { AUTH_ROUTE_TYPES } from '@/constants/routePath';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <LandingContainerLeft>
      <div className="my-8 max-w-lg">
        <p className="text-base font-semibold leading-8 text-blue-primary">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Seems like your message got a bit lost at sea. Let&apos;s navigate you
          back to familiar waters! This way back to OmiConvo!
        </p>
        <div className="mt-10">
          <Link
            to={AUTH_ROUTE_TYPES.LOGIN}
            className="text-sm font-semibold leading-7 text-blue-primary hover:underline"
          >
            <span aria-hidden="true">&larr;</span> Back to Home
          </Link>
        </div>
      </div>
    </LandingContainerLeft>
  );
};

export default Error404;
