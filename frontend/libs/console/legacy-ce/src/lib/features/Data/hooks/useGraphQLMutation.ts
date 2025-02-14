import { useMutation } from 'react-query';
import { runGraphQL } from '@/features/DataSource';
import { useHttpClient } from '@/features/Network';
import { AxiosResponseHeaders } from 'axios';

export function useGraphQLMutation({
  operationName,
  headers,
  onError,
  onSuccess,
}: {
  operationName: string;
  headers?: AxiosResponseHeaders;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}) {
  const httpClient = useHttpClient();
  return useMutation<
    any, // runGraphQL returns any
    Error,
    { query: string; resultPath: string }
  >(
    async ({ query }) => {
      try {
        const res = await runGraphQL({
          httpClient,
          operationName,
          query,
          headers,
        });
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onSuccess,
      onError,
    }
  );
}
