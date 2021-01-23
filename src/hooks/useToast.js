import { toast } from 'react-toastify';

export default () => {
  const showToast = label => {
    toast.success(label);
  };

  const showErrorToast = label => {
    toast.error(label);
  };

  return { showToast, showErrorToast };
};
