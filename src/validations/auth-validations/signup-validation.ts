import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
    phone_number: yup
      .string()
      .required('This Field is Required'),
    name: yup
      .string()
      .required('This Field is Required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('This Field is Required'),
    password: yup
      .string()
      .min(8, 'Password should be at least 8 characters')
      .max(20, 'Password should be less than 20 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
      .required('This Field is Required'),
  });
