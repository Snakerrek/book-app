export const xssSanitize = (value: string) => {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// validator to check for sql injection
export const validateSQLInjection = (value: string) => {
  const sqlRegex = /(%27)|(--)|(%23)|(#)/;
  return !sqlRegex.test(value);
};

//password validator, at least one number, one lowercase, one uppercase, one special character, and at least 8 characters long
export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  return passwordRegex.test(password) && validateSQLInjection(password);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email) && validateSQLInjection(email);
};

export const validateNonEmpty = (value: string) => {
  return value.length > 0 && validateSQLInjection(value);
};

export const validateAtLeast = (value: string, min: number) => {
  return value.length >= min && validateSQLInjection(value);
};
