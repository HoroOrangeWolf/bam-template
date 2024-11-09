import { AccountModel, AccountTypes } from '@main/db/models/account.model.ts';
import jwt, { SignOptions } from 'jsonwebtoken';

export const JWT_SECRET = 'kjsadhjkasdhgasuiuih!3241lkskajdjklasdkljhasl;kddasl;';

export type JwtPayload = {
    id: number;
    username: string;
    account_type: AccountTypes
}

const generateTokenForUser = (user: AccountModel) => {
  const signOptions: SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const payload: JwtPayload = {
    id: user.account_id,
    username: user.account_name,
    account_type: user.account_type,
  };

  return jwt.sign(payload, JWT_SECRET, signOptions);
};

const JwtTokenService = {
  generateTokenForUser,
};

export default JwtTokenService;
