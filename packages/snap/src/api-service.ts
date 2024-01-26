import type { ApiRequest } from './models/api-request';
import type { ApiResponse } from './models/api-response';

export const fetchApiResponse: (
  request: ApiRequest,
) => Promise<ApiResponse> = async (request) => {
  const apiKey = 'g0i3nb9g3nuNMDSEFin348ngf3om23rn0iwnd2434';
  const response = await fetch(
    `https://dev-snap-api.rubic.exchange/calculate?apikey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
  );
  return response.json();
};
