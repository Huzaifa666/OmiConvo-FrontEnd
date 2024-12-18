import BackgroundOrgOnboard from '@assets/images/bg-orgOnboard.png';
import CustomCarousel from '@pages/instagram/carousel.jsx';

export const Instagram = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${BackgroundOrgOnboard})` }}
        className="grid h-screen grid-cols-4 grid-rows-12"
      >
        <div className="col-span-2 col-start-2 row-span-10 row-start-2 rounded-xl border border-transparent bg-white shadow-xl">
          <div className="flex flex-col">
            <span className="w-full border bg-white p-8 text-center shadow">
              <p className="text-2xl font-semibold">Instagram Post</p>
              <p className="p-1">
                Use Our AI-powered platform to design a post for your instagram
              </p>
            </span>
            <div className="h-full w-full bg-white">
              <CustomCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
