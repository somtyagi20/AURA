import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  phone_number: yup
  .string()
  .required('This Field is Required'),
  password: yup
  .string()
  .required('This Field is Required'),
  });
