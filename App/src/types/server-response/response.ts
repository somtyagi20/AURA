type TServerResponse = {
    statusCode: 200 | 201 | 202 | 204 | 400  | 401 | 403 | 429 | 500;
    title: string;
    message: string;
    data?: Record<string, any>;
    success: boolean;
  };

type TOnSuccessHandle = (res: TServerResponse) => void;
type TOnErrorHandle = (res: any) => void;

type TQueryOptions = {
  onSuccess?: TOnSuccessHandle;
  onError?: TOnErrorHandle;
  enabled?: boolean;
};
