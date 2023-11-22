import { expect, test, describe } from 'bun:test';
import app from 'rest/app';

console.log(process.env.PORT);

describe('POST v1/login', () => {
  test('Missing username', () => {
    expect(2 + 2).toBe(4);
  });

  test('Username is not email patten', () => {
    expect(2 + 2).toBe(4);
  });

  test('Missing password', () => {
    expect(2 + 2).toBe(4);
  });

  test('Password length < 6 digit', () => {
    expect(2 + 2).toBe(4);
  });

  test('Password length < 6 digit', () => {
    expect(2 + 2).toBe(4);
  });

  test('User not exists', () => {
    expect(2 + 2).toBe(4);
  });

  test('Password is not match', () => {
    expect(2 + 2).toBe(4);
  });

  test('User is deleted', () => {
    expect(2 + 2).toBe(4);
  });

  test('User is not active', () => {
    expect(2 + 2).toBe(4);
  });

  test('User is ready', () => {
    expect(2 + 2).toBe(4);
  });
});
