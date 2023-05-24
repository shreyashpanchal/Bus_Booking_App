const validateEmailRegex = /^\S+@\S+\.\S+$/;

const EmailCheck = (email) => {
  return validateEmailRegex.test(email);
};

export default EmailCheck;
