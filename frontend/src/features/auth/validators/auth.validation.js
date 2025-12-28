export const validateLogin = (data) => {
  const errors = {};
  if (!data.email) errors.email = "Email required";
  if (!data.password) errors.password = "Password required";
  return errors;
};

export const validateRegister = (data) => {
  const errors = {};
  if (!data.name) errors.name = "Name required";
  if (!data.email) errors.email = "Email required";
  if (!data.password) errors.password = "Password required";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  return errors;
};
