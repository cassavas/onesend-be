import { emailRegex } from 'shared/types/const';
import { customAlphabet, nanoid } from 'nanoid';
import parsePhoneNumber, { PhoneNumber } from 'libphonenumber-js';

export const jsonToMarkdown = (jsonObj: any, depth = 0) => {
  let markdown = '';

  if (typeof jsonObj === 'object') {
    if (Array.isArray(jsonObj)) {
      markdown += `${'  '.repeat(depth)}- `;
      jsonObj.forEach((item) => {
        markdown += jsonToMarkdown(item, depth + 1) + '\n';
      });
    } else {
      markdown += '{\n';
      for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
          markdown += `${'  '.repeat(depth + 1)}${key}: ${jsonToMarkdown(jsonObj[key], depth + 1)}\n`;
        }
      }
      markdown += `${'  '.repeat(depth)}}`;
    }
  } else {
    markdown += jsonObj;
  }

  return markdown;
};

export const emailValidation = (email: string) => {
  const testInstance = new RegExp(emailRegex);
  return testInstance.test(email);
};

export const newPublicId = (): string => {
  return nanoid(15);
};

export const newAppId = () => {
  return nanoid(60);
};

export const newOtp = (size: number) => {
  return customAlphabet('1234567890', size)().toString();
};

export const phoneInformation = (_phone: string): PhoneNumber | undefined => {
  return parsePhoneNumber(_phone);
};

export const getSampleOtpTemplate = (otp: string, type: 'vi' | 'vi_uni' | 'en') => {
  switch (type) {
    case 'vi':
      return `Ma xac thuc [SAMPLE TEST] cua ban la: ${otp}`;
    case 'vi_uni':
      return `Mã xác thực [SAMPLE TEST] của bạn là: ${otp}`;
    case 'en':
      return `Your [SAMPLE TEST] verification code is: ${otp}`;
  }
};
