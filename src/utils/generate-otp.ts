export const generateOTP = (): string => {
  const otpLength: number = 6;
  const digits: string = '0123456789';
  let otp: string = '';

  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
};

export const generateReferenceOTP = (): string => {
  const otpLength: number = 6;
  const digits: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp: string = '';

  for (let i = 1; i <= otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
};
