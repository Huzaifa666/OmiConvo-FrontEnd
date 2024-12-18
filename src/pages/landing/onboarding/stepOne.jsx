import { TextField } from '@/components/landing/landingFields';

const OnboardingStepOne = ({ inputProps }) => {
  return (
    <li>
      <div className="relative flex flex-col">
        <p className="text-3xl font-bold text-black">
          What is the name of the company or team?
        </p>

        <div className="relative h-[150px]">
          <p className="py-5 text-md text-black">
            This will be the organization name - choose something that your team
            will recognize easily.
          </p>

          <TextField
            type="text"
            className="text-grey-darker block h-10 appearance-none rounded-l-lg bg-gray-100 xl:w-1/2"
            placeholder="Ex: Acme Marketing or Acme Co"
            {...inputProps}
          />
        </div>
      </div>
    </li>
  );
};

export default OnboardingStepOne;
