const phoneRegex = /^\+?[1-9][0-9]{7,14}$/;

const PhoneCheck = (phone) => {
  return phoneRegex.test(phone);
};

export default PhoneCheck;
