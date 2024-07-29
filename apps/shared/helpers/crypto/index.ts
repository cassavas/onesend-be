import jwt from 'jsonwebtoken';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export default class Crypto {
  private _algorithm: 'bcrypt' | 'argon2id' | 'argon2d' | 'argon2i';

  constructor() {
    this._algorithm = 'argon2id';
  }

  public hashPassword(password: string): string {
    return Bun.password.hashSync(password, {
      algorithm: this._algorithm
    });
  }

  public comparePassword(password: string, hash: string): boolean {
    return Bun.password.verifySync(password, hash);
  }

  public generateAuthToken(email: string): string {
    if (!process.env.SECRET_TOKEN) {
      throw new LogError(ErrorVars.E000_SERVER_ERROR);
    }

    return Bun.password.hashSync(`${process.env.SECRET_TOKEN}${email}`, {
      algorithm: this._algorithm
    });
  }

  public verifyAuthToken(token: string, email: string): boolean {
    if (!process.env.SECRET_TOKEN) {
      throw new LogError(ErrorVars.E000_SERVER_ERROR);
    }

    return Bun.password.verifySync(`${process.env.SECRET_TOKEN}${email}`, token);
  }

  public verifyActiveToken(token: string, secretKey: string = process.env.SECRET_TOKEN ?? ''): jwt.JwtPayload {
    try {
      return jwt.verify(token, secretKey) as jwt.JwtPayload;
    } catch (e) {
      throw new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION');
    }
  }

  public signActiveToken(payload: { email: string }, key: string = process.env.SECRET_TOKEN ?? ''): string {
    if (!key) {
      throw new LogError('MISSING_KEY');
    }

    return jwt.sign(payload, key, { expiresIn: '30m' });
  }

  // why don't use signActiveToken ?
  public resetPasswordToken(payload: { email: string }, key: string = process.env.SECRET_TOKEN ?? ''): string {
    if (!key) {
      throw new LogError('MISSING_KEY');
    }

    return jwt.sign(payload, key, { expiresIn: '1h' });
  }
}
