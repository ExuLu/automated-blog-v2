export type ApiResponse<TData> = {
  status: 'success' | 'fail' | 'error';
  data: TData;
};

export type ApiFailure = {
  status: 'fail' | 'error';
  message?: string;
  data?: unknown;
};
