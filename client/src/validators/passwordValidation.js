const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PasswordCheck = (password) => {
  return passwordRegex.test(password);
};

export default PasswordCheck;
