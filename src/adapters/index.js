export const tokenAdapter = ({ data } = {}) => ({
  token: data?.data,
  success: data?.success,
  error: data?.error,
  message: data?.message,
});

export const payloadAuthAdapter = ({ data } = {}) => ({
  payload: data?.data,
  success: data?.success,
  error: data?.error,
  message: data?.message,
});

export const userAdapter = ({ data } = {}) => ({
  user: data?.data,
  success: data?.success,
  error: data?.error,
  message: data?.message,
});

export const propertyAdapter = ({ data } = {}) => ({
  property: data?.data,
  success: data?.success,
  error: data?.error,
  message: data?.message,
});

export const agreementAdapter = ({ data } = {}) => ({
  agreement: data?.data,
  success: data?.success,
  error: data?.error,
  message: data?.message,
});

export const rentAdapter = ({ data } = {}) => ({
  rent: data?.data,
  success: data?.success,
  error: data?.error,
  message: data?.message,
});
