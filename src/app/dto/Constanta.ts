export const FORM_VALIDATION = {
    form: [
      { type: 'required', message: 'Please fill this form' },
      { type: 'pattern', message: 'Input not valid' },
      { type: 'email', message: 'Email not valid' },
    ],
    password: {
      minLength: 6
    },
};