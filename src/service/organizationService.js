class OrganizationService {
  static async createOrg(orgName) {
    try {
      const body = {
        name: orgName,
      };

      const jwtToken = localStorage.getItem('jwt');
      if (jwtToken == null) {
        throw new Error({
          success: false,
          redirect: false,
          message: 'Token not found',
        });
      }

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/organization`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'airpipe-token': jwtToken,
          },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        throw new Error('Server error');
      }
      return true;
    } catch (error) {
      console.error('Create Organization failed:', error.message);
      throw error;
    }
  }

  static async getOrgList() {
    try {
      const jwt = localStorage.getItem('jwt');

      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/organization/list`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'airpipe-token': jwt,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Server error');
      }

      if (data?.data?.CheckHeaderToken?.errors) {
        throw new Error('Unauthorized');
      }

      return { success: true, data: data?.data?.GetOrganizations?.data };
    } catch (error) {
      console.error('Get Organization failed:', error.message);
      throw error;
    }
  }
}

export default OrganizationService;
