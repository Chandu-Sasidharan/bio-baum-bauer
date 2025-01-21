const formatZodError = error => {
  return error.errors.map(error => {
    return {
      field: error.path.join('.'),
      message: error.message,
    };
  });
};

export default formatZodError;
