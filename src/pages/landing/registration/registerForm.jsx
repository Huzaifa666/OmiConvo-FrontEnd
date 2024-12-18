import { useForm } from '@mantine/form';
import {
  getPasswordColorStrength,
  getPasswordStrength,
  validateField,
} from '@/utility/utils';
import { Box, Popover, Progress, rem, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconCheck, IconEye, IconEyeOff, IconX } from '@tabler/icons-react';
import { AUTH_ROUTE_TYPES, MISCELLANEOUS_ROUTES } from '@/constants/routePath';
import LandingButton from '@/components/landing/landingButton';
import { ErrorMessage } from '@/components/alertMessage';
import AuthService from '@/service/authService';
import { useDisclosure } from '@mantine/hooks';
import { TextField } from '@/components/landing/landingFields';
import { Link } from 'react-router-dom';

const PasswordRequirement = ({ isFulfilled, label }) => {
  return (
    <Text
      c={isFulfilled ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {isFulfilled ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};

const RegisterForm = ({ navigate }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [showPassword, setShowPassword] = useDisclosure(false);
  const [isButtonClick, setButtonClick] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      first: '',
      last: '',
      email: '',
      pass: '',
    },

    validate: {
      first: (value) =>
        validateField(
          'text',
          'First Name',
          value,
          /^[A-Za-z]+$/,
          'Only accepte letters for First name',
        ),
      last: (value) =>
        validateField(
          'text',
          'Last Name',
          value,
          /^[A-Za-z]+$/,
          'Only accept letters for Last name',
        ),
      email: (value) =>
        validateField(
          'email',
          'Email address',
          value,
          /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|"(?:[^"\\]|\\.)*")@(?:(?:[^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,}|(?:\d{1,3}\.){3}\d{1,3})$/,
        ),
      pass: (value) =>
        validateField('password', 'Password', value, passwordStrength),
    },
  });

  const handleOnSubmit = async (values) => {
    try {
      setButtonClick.open();
      const result = await AuthService.register(values);
      if (result.success) {
        localStorage.setItem('email', result.data.email);
        navigate(AUTH_ROUTE_TYPES.VERIFY);
      }
    } catch (error) {
      setButtonClick.close();
      setErrorMessage(error.message);
    }
  };

  const requirements = [
    { re: /.{10,}/, label: 'Includes at least 10 characters' },
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    {
      re: /[$&+,:;=?@#|'<>.^*()%!-]/,
      label: 'Include special symbols such as @, # or !',
    },
  ];

  const passwordCheckLists = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      isFulfilled={requirement.re.test(form.values.pass)}
    />
  ));

  const passwordStrength = getPasswordStrength(requirements, form.values.pass);
  const colorStrength = getPasswordColorStrength(passwordStrength);

  useEffect(() => {
    if (passwordStrength === 100) {
      setPopoverOpened(false);
    }

    if (passwordStrength > 20 && passwordStrength < 100) {
      setPopoverOpened(true);
    }

    if (form.errors.pass) {
      setPopoverOpened(false);
    }
  }, [passwordStrength, form.errors.pass]);

  return (
    <form
      onSubmit={form.onSubmit((values) => handleOnSubmit(values))}
      className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:gap-y-6"
    >
      {errorMessage && <ErrorMessage type="error" errMsg={errorMessage} />}

      <TextField
        label="First name"
        type="text"
        placeholder="First Name"
        {...form.getInputProps('first')}
      />

      <TextField
        label="Last name"
        type="text"
        placeholder="Last Name"
        {...form.getInputProps('last')}
      />

      <TextField
        className="col-span-full"
        label="Email address"
        type="text"
        placeholder="omiconvo@example.com"
        {...form.getInputProps('email')}
      />

      <Popover
        className="col-span-full"
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: 'pop' }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <TextField
              className="col-span-full"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter at least 10+ character"
              rightIcon={
                showPassword ? (
                  <IconEye onClick={() => setShowPassword.close()} />
                ) : (
                  <IconEyeOff onClick={() => setShowPassword.open()} />
                )
              }
              {...form.getInputProps('pass')}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress
            color={colorStrength}
            value={passwordStrength}
            size={5}
            mb="xs"
          />
          {passwordCheckLists}
        </Popover.Dropdown>
      </Popover>

      <p className="col-span-full text-xs">
        By clicking continue, I agree to OmiConvo&apos;s
        <Link
          to={MISCELLANEOUS_ROUTES.TERMS}
          className="mx-1 text-blue-primary hover:underline"
        >
          Terms of Service
        </Link>
        &
        <Link
          to={MISCELLANEOUS_ROUTES.PRIVACY}
          className="ml-1 text-blue-primary hover:underline"
        >
          Privacy Policy
        </Link>
        <span className="text-black">.</span>
      </p>

      <LandingButton
        text="Create account"
        className="col-span-full mt-2"
        disabled={isButtonClick}
      />
    </form>
  );
};

export default RegisterForm;
