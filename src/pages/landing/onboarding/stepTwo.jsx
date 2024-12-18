import { IconPlus } from '@tabler/icons-react';
import React, { useState } from 'react';
import { validateField } from '@/utility/utils';
import { TextField } from '@/components/landing/landingFields';

const OnboardingStepTwo = () => {
  const [email, setEmail] = useState('');
  const [isEmailError, setEmailError] = useState(null);

  const handleOnClickPlusIcon = (e) => {
    e.preventDefault();
    const errMsg = validateField('email', 'Email', email);
    if (errMsg) {
      setEmailError(errMsg);
    } else {
      handleEmailInvitation(email);
    }
  };

  const handleEmailInvitation = (email) => {
    // request backend call to send email
    console.log(email);
  };

  return (
    <li>
      <div className="relative flex flex-col">
        <p className="text-3xl font-bold text-black">
          Who else is on this team right now?
        </p>

        <div className="relative lg:h-[150px]">
          <p className="py-5 text-md text-black">
            Try out OmiConvo with your team! This is the first step in improving
            social customer engagement.
          </p>

          <div className="flex flex-row items-center">
            <TextField
              className="text-grey-darker block h-10 w-full appearance-none rounded-l-lg bg-gray-100 xl:w-1/2"
              placeholder="Ex: john@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />

            <button
              onClick={handleOnClickPlusIcon}
              className="ml-2 flex cursor-pointer items-center text-blue-primary"
            >
              <IconPlus size={18} />
              Add
            </button>
          </div>

          {isEmailError && (
            <p className="absolute pt-1 text-sm text-red-500">{isEmailError}</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default OnboardingStepTwo;
