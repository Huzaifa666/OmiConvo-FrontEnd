import LandingButton from '@/components/landing/landingButton';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { AUTH_ROUTE_TYPES, DASHBOARD_ROUTE_TYPES } from '@/constants/routePath';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '@/components/alertMessage';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { validateField } from '@/utility/utils';
import { TextField } from '@/components/landing/landingFields';
import { useAuthContext } from '@/context/auth/authContext';
import AuthService from '@/service/authService';
import OrganizationService from '@/service/organizationService';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAppState } = useAuthContext();
  const [showPassword, setShowPassword] = useDisclosure(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      email: '',
      pass: '',
    },

    validate: {
      email: (value) =>
        validateField(
          'email',
          'Email address',
          value,
          /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|"(?:[^"\\]|\\.)*")@(?:(?:[^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,}|(?:\d{1,3}\.){3}\d{1,3})$/,
        ),
      pass: (value) => (!value.trim() ? 'Password cannot be empty' : null),
    },
  });

  const handleOnSubmit = async (values) => {
    try {
      setIsBtnClicked(true);
      setError(null);
      const result = await AuthService.login(values);
      if (result.success) {
        const email = result.data.email;
        setAppState({ email: email, isAuthenticated: true });
        await OrganizationService.getOrgList().then((result) => {
          const orgs = result.data;
          if (result.success && orgs.length > 0) {
            setAppState({
              selectedOrg: orgs[0],
              email: result.data.email,
              isAuthenticated: true,
              organizations: orgs,
            });
            navigate('/instagram');
          } else {
            console.error('no organization');
            navigate(DASHBOARD_ROUTE_TYPES.ONBOARDING);
          }
        });
      }
    } catch (error) {
      setIsBtnClicked(true);
      setError(error.message);
      setAppState({ isAuthenticated: false });
    }
  };

  useEffect(() => {
    if (error) {
      setIsBtnClicked(false);
    }
  }, [error]);

  return (
    <form
      onSubmit={form.onSubmit((values) => handleOnSubmit(values))}
      className="mt-6 grid grid-cols-1 gap-y-8 md:gap-y-6"
    >
      {error && <ErrorMessage type="error" errMsg={error} />}

      <TextField
        label="Email address"
        type="text"
        placeholder="Your email"
        {...form.getInputProps('email')}
      />

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Your password"
        rightIcon={
          showPassword ? (
            <IconEye onClick={() => setShowPassword.close()} />
          ) : (
            <IconEyeOff onClick={() => setShowPassword.open()} />
          )
        }
        {...form.getInputProps('pass')}
      />

      <p className="flex text-sm text-blue-primary">
        <Link className="hover:underline" to={AUTH_ROUTE_TYPES.FORGOTPWD}>
          Forgot Password?
        </Link>
      </p>

      <LandingButton
        text="Continue"
        className="mb-5 w-full"
        disabled={isBtnClicked}
      />
    </form>
  );
};

export default LoginForm;
