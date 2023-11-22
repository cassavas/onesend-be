import jwt from 'jsonwebtoken';
import { LogError } from 'shared/error/logError.ts';
import { USER_TOKEN_PAYLOAD } from 'shared/types/user';
import { ErrorVars } from 'shared/error/errorVars.ts';

export default class Crypto {
  private _algorithm: 'bcrypt' | 'argon2id' | 'argon2d' | 'argon2i';
  constructor() {
    this._algorithm = 'bcrypt';
  }
  public hashPassword(password: string): string {
    return Bun.password.hashSync(password, {
      algorithm: this._algorithm
    });
  }
  public comparePassword(password: string, hash: string): boolean {
    return Bun.password.verifySync(password, hash);
  }
  public verifyToken(token: string, secretKey: string = process.env.SECRET_TOKEN ?? ''): jwt.JwtPayload {
    try {
      const _token = token.split(' ')[1];
      return jwt.verify(_token, secretKey) as jwt.JwtPayload;
    } catch (e) {
      throw new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION');
    }
  }
  public signToken(payload: USER_TOKEN_PAYLOAD): string {
    if (!process.env.SECRET_TOKEN) {
      throw new LogError('MISSING_KEY');
    }

    return jwt.sign(payload, process.env.SECRET_TOKEN);
  }
}
