import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import LandingButton from '@/components/landing/landingButton';
import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-react';
import OnboardingStepOne from '@/pages/landing/onboarding/stepOne';
import OnboardingStepTwo from '@/pages/landing/onboarding/stepTwo';
import { validateField } from '@/utility/utils';
import { AUTH_ROUTE_TYPES, DASHBOARD_ROUTE_TYPES } from '@/constants/routePath';
import OrganizationService from '@/service/organizationService';
import TitleLogo from '@/components/landing/titleLogo';
import { LandingContainerCenter } from '@/components/landing/landingContainer';
import { useSetState } from '@mantine/hooks';
import { useAuthContext } from '@/context/auth/authContext';

const Onboarding = () => {
  const auth = useAuthContext();
  const [state, setState] = useSetState({
    step: 1,
  });
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      orgName: '',
    },

    validate: {
      orgName: (value) =>
        validateField(
          'text',
          'Organization name',
          value,
          /^[a-zA-Z0-9\s]+$/,
          'Only accept letters or number for Organization name',
        ),
    },
  });

  const handleOnClickBack = (e) => {
    e.preventDefault();
    setState({ step: 1 });
  };

  const handleOnClickNext = () => {
    setState({ step: 2 });
  };

  const handleOnClickFinish = async () => {
    try {
      const result = await OrganizationService.createOrg(form.values.orgName);
      if (result) {
        navigate(
          {
            pathname: DASHBOARD_ROUTE_TYPES.CHANNELS,
          },
          { replace: true },
        );
      }
    } catch (error) {
      navigate(
        {
          pathname: AUTH_ROUTE_TYPES.LOGIN,
        },
        { replace: true },
      );
    }
  };

  const handleOnSubmit = async () => {
    if (state.step === 1) {
      handleOnClickNext();
    } else {
      handleOnClickFinish();
    }
  };

  return (
    <LandingContainerCenter>
      <div className="flex justify-start">
        <TitleLogo />
      </div>
      <form className="mt-8" onSubmit={form.onSubmit(() => handleOnSubmit())}>
        <div className="flow-root">
          <p className="mb-5 text-body font-semibold">
            Step
            <span className="mx-1 text-blue-primary">{state.step}</span>
            of 2
          </p>
          <ul role="list">
            {state.step === 1 ? (
              <OnboardingStepOne inputProps={form.getInputProps('orgName')} />
            ) : (
              <OnboardingStepTwo />
            )}
          </ul>
        </div>

        <div className="relative mt-14 flex justify-end xl:mt-0">
          {state.step === 1 ? (
            <LandingButton
              className="w-full xl:w-20"
              text="Next"
              rightIcon={<IconArrowRight />}
            />
          ) : (
            <div className="flex w-full justify-end gap-x-2">
              <LandingButton
                className="w-full xl:w-20"
                text="Back"
                leftIcon={<IconArrowLeft />}
                onClick={handleOnClickBack}
              />

              <LandingButton
                className="w-full xl:w-20"
                text="Finish"
                rightIcon={<IconCheck />}
              />
            </div>
          )}
        </div>
      </form>
    </LandingContainerCenter>
  );
};

export default Onboarding;
