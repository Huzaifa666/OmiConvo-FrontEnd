class AuthService {
  static async register(userDetails) {
    try {
      const body = {
        first: userDetails.first,
        last: userDetails.last,
        email: userDetails.email,
        pass: userDetails.pass,
      };

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data?.data?.InsertUser?.errors) {
          throw new Error('This email already exists. Please try other.');
        }
      } else {
        throw new Error('Server error');
      }
      return { success: true, data: { email: data?.data?.Input?.data?.email } };
    } catch (error) {
      console.error('Error occurred during registration:', error);
      throw error;
    }
  }

  static async login(userDetails) {
    try {
      const body = {
        email: userDetails.email,
        pass: userDetails.pass,
      };

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data?.data?.GetUserDetails?.error) {
          throw new Error(
            'Your account is not verified. Please verify your account to proceed',
          );
        }

        if (data?.data?.GetUserDetails?.errors) {
          throw new Error('Your account does not exist');
        }

        if (data?.data?.VerifyPassword?.error) {
          throw new Error('Password does not match with the account');
        }
      }

      const jwtToken = data?.data?.VerifyPassword?.data?.jwt;
      localStorage.setItem('jwt', jwtToken);
      return { success: true, data: data?.data?.VerifyPassword?.data };
    } catch (error) {
      console.error('Error occurred during login:', error);
      throw error;
    }
  }

  static async verifyEmail(token) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/user/verify?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Verification email has failed.');
      }

      if (!data?.data?.VerifyToken?.data) {
        throw new Error('Verification email has failed.');
      }

      return true;
    } catch (error) {
      console.error('Error occurred during verifying email:', error.message);
      throw error;
    }
  }

  static async validateToken(token) {
    try {
      const body = {
        token: token,
      };

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/user/validate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Unauthorized');
      }

      if (data?.data?.Input?.errors) {
        throw new Error('Token is not valid');
      }

      return { success: true, data: data?.data?.Input?.data?.jwt_claims?.data };
    } catch (error) {
      console.error('Error occurred during validating token:', error);
      throw error;
    }
  }
}

export default AuthService;
