import { Loader } from '@/components/loader';
import { DASHBOARD_ROUTE_TYPES } from '@/constants/routePath';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <div className="mx-auto flex w-40 justify-center">
          <Loader />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Build Growth with Social Messenging
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Start by connecting your first integration with OmiConvo.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link
            to={DASHBOARD_ROUTE_TYPES.CHANNELS}
            className="rounded-md bg-blue-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2869A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
