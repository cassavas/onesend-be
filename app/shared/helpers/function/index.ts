import { emailRegex } from 'shared/types/const';

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
