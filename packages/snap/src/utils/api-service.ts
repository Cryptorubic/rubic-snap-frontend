import type { ApiRequest } from '../models/api-request';
import type { ApiResponse } from '../models/api-response';

export const fetchApiResponse: (
  request: ApiRequest,
) => Promise<ApiResponse> = async (request) => {
  const apiKey = '2nvg294nr93fmweifm29brbengvn395tb4bnemf39rnvdjnveub3';
  const responsePromise = fetch(
    `https://snap-api.rubic.finance/calculate?apikey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
  );
  const timeoutPromise = new Promise<null>((resolve) =>
    setTimeout(() => resolve(null), 10_000),
  );

  const result = await Promise.race([responsePromise, timeoutPromise]);
  if (!result) {
    throw new Error('Timeout error');
  }
  return result.json();
};
