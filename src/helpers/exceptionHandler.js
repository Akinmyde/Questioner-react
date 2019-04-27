import { toast } from 'react-toastify';

const exceptionHandler = (ex) => {
  const { status } = ex.request;
  if (ex.response && status > 400 && status < 500) {
    const { error } = ex.response.data;
    if (error === 'Unauthorized') {
      window.location = '/';
    }
    return toast.error(error);
  }
  if (status > 500) {
    return toast.error('An unexpected error occur');
  }
  return toast.error('An unexpected error occur');
};

export default exceptionHandler;
