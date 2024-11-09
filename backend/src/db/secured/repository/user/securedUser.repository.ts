import { dbClient } from '@main/db/database.setup.ts';
import { head } from 'lodash';
import { AccountModel } from '@main/db/models/account.model.ts';

const findUserByUsername = (username: string) => (
  dbClient.query<AccountModel>('SELECT * FROM accounts c WHERE c.account_name = $1', [username])
    .then((result) => head(result.rows))
);

const findUserById = (id: number) => (
  dbClient.query<AccountModel>('SELECT * FROM accounts c WHERE c.account_id = $1', [id])
    .then((result) => head(result.rows))
);

const SecuredUserRepository = {
  findUserById,
  findUserByUsername,
};

export default SecuredUserRepository;
