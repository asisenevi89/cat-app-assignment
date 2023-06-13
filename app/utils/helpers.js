
export const getFormattedResponse = (status, message, data = []) => {
  return {
    status,
    message,
    data,
  };
};

export const getErrorResponse = (message = "Error Occurred", statusCode = 500) => {
  return {
    error: true,
    statusCode,
    message,
  };
};

export const processParams = params => {
  const data = {};

  params.forEach(param => {
    const paramArray = param.split('=');

    if (paramArray.length !== 2) return
    
    data[paramArray[0]] = paramArray[1]
  });

  return data;
}