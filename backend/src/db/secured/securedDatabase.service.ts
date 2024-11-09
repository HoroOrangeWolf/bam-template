import { isNil } from 'lodash';
import PasswordService from '@main/password/password.service.ts';
import SecuredUserRepository from '@main/db/secured/repository/user/securedUser.repository.ts';

const findUserByUsernameAndPassword = async (username: string, password: string) => {
  const byUsername = await SecuredUserRepository.findUserByUsername(username);

  if (isNil(byUsername)) {
    throw new Error(`Account by name ${username} doesn't exists`);
  }

  const isPasswordEqual = PasswordService.comparePassword(byUsername.password, password);

  if (!isPasswordEqual) {
    throw new Error('Account by name doesn\'t exists');
  }

  return byUsername;
};

const getUserById = async (userId: number) => {
  const user = await SecuredUserRepository.findUserById(userId);

  if (isNil(user)) {
    throw new Error(`Couldn't find user by id=${userId}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...noPassword } = user;

  return noPassword;
};

const SecuredDatabaseService = {
  getUserById,
  findUserByUsernameAndPassword,
};

export default SecuredDatabaseService;
