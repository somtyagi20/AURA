import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('This Field is Required'),
    password: yup
      .string()
      .required('This Field is Required'),
  });
