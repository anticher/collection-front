export const registrationFormLimits = {
  username: {
    required: true,
    maxLength: 30,
  },
  email: {
    required: true,
    maxLength: 40,
    pattern: /.+@.+\..+/i,
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 200,
  },
};
