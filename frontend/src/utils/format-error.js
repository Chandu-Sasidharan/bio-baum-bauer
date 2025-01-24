// Function to format error messages
const formatError = error => {
  if (!error.response) {
    return 'Something went wrong!';
  }

  const { status, data } = error.response;

  if (status === 400 && data.errors) {
    const errorMessage = data.errors
      .map(err => `<li>${err.message}</li>`)
      .join('');
    return `<ul>${errorMessage}</ul>`;
  }

  return data.message || 'Something went wrong!';
};

export default formatError;
