import * as yup from 'yup'
export const schema = {
  firstName: yup
    .string()
    .required("First Name is Required")
    .label("First Name"),
  lastName: yup
    .string()
    .required("Last Name is Required")
    .label("Last Name")
};

