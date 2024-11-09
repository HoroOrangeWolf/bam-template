import { isNil } from 'lodash';
import JwtTokenService from '@main/security/jwtToken.service.ts';
import SecuredDatabaseService from '@main/db/secured/securedDatabase.service.ts';

const loginUser = async (username: string, password: string): Promise<string> => {
  const user = await SecuredDatabaseService.findUserByUsernameAndPassword(username, password);

  if (isNil(user)) {
    throw new Error('Username or password is not correct');
  }

  return JwtTokenService.generateTokenForUser(user);
};

const SecuredLoginService = {
  loginUser,
};

export default SecuredLoginService;
