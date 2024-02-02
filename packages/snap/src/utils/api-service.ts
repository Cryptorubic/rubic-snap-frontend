import type { ApiRequest } from '../models/api-request';
import type { ApiResponse } from '../models/api-response';

export const fetchApiResponse: (
  request: ApiRequest,
) => Promise<ApiResponse> = async (request) => {
  const apiKey = '2nvg294nr93fmweifm29brbengvn395tb4bnemf39rnvdjnveub3';
  const response = await fetch(
    `https://snap-api.rubic.exchange/calculate?apikey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
  );
  return response.json();
};
