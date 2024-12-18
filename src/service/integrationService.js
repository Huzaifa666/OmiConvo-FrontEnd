class IntegrationService {
  static async integrateFacebook(code, orgUuid, redirect_uri) {
    try {
      const body = {
        code: code,
        organization_uuid: orgUuid,
        redirect_uri: redirect_uri,
      };

      const jwtToken = localStorage.getItem('jwt');

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/facebook/pages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'airpipe-token': jwtToken,
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Server error');
      }

      if (data?.data?.AddPages?.error) {
        throw new Error('Connect to Facebook failed');
      }

      return true;
    } catch (error) {
      console.error('Integrate Facebook failed:', error.message);
      throw error;
    }
  }

  static async getInstalledLists(orgUuid) {
    try {
      const body = {
        organization_uuid: orgUuid,
      };

      const jwtToken = localStorage.getItem('jwt');

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/integrations/list`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'airpipe-token': jwtToken,
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Server error');
      }

      if (data?.data?.CheckHeaderToken?.errors) {
        throw new Error('Unauthorized');
      }

      if (data?.data?.CheckBody?.errors) {
        throw new Error('Invalid organization');
      }

      return data?.data?.Integrations?.data;
    } catch (error) {
      console.error('Get Integration Lists failed:', error.message);
      throw error;
    }
  }

  static async setActiveInstalled(orgUuid, integUuid) {
    try {
      const body = {
        organization_uuid: orgUuid,
        integration_uuid: integUuid,
      };
      const jwtToken = localStorage.getItem('jwt');

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/integrations/toggle`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'airpipe-token': jwtToken,
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Server error');
      }

      return data?.data?.Integration?.data;
    } catch (error) {
      console.error('Set Active Integration', error.message);
      throw error;
    }
  }
}

export default IntegrationService;
