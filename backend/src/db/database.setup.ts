import { Client, QueryResultRow } from 'pg';
import PasswordService from '@main/password/password.service.ts';

export const dbClient = new Client({
  user: 'postgres',
  password: 'postgres',
  database: 'bai',
  port: 5432,
  host: 'localhost',
});

const schema = '-- Creating the Account table\n'
    + 'CREATE TABLE accounts (\n'
    + '    account_id SERIAL PRIMARY KEY,\n'
    + '    name VARCHAR(100),\n'
    + '    surname VARCHAR(100),\n'
    + '    account_name VARCHAR(255),\n'
    + '    password VARCHAR(255),\n'
    + '    street VARCHAR(255),\n'
    + '    account_type VARCHAR(255),\n'
    + '    city VARCHAR(100),\n'
    + '    state VARCHAR(100),\n'
    + '    zip_code VARCHAR(20),\n'
    + '    country VARCHAR(100),\n'
    + '    phone_number VARCHAR(20)\n'
    + ');';

const ifExistsAccounts = `
SELECT EXISTS (
  SELECT FROM pg_catalog.pg_tables 
  WHERE schemaname = 'public' 
  AND tablename  = 'accounts'
) AS exists;
`;

const hashedPassword = PasswordService.hashPassword('securePass456');

const initAccounts = `
-- Inserting data for admin
INSERT INTO accounts (
    name, 
    surname, 
    account_name, 
    password, 
    street, 
    account_type, 
    city, 
    state, 
    zip_code, 
    country, 
    phone_number
) VALUES (
    'Jane', 
    'Smith', 
    'admin1', 
    '${hashedPassword}',
    '5678 Elm Street', 
    'ADMIN', 
    'Othertown', 
    'Otherstate', 
    '67890', 
    'USA', 
    '555-5678'
);
`;

const existsAccountQuery = `
SELECT 
  (SELECT EXISTS(SELECT 1 FROM accounts WHERE account_name = 'admin1')) AS admin1_exists;
`;

interface ExistQueryResultAccounts extends QueryResultRow {
  admin2_exists: boolean;
}

export const createDefaultAccounts = async () => (
  dbClient.query(initAccounts)
);

export const checkIfDefaultAccountExists = () => (
  dbClient.query<ExistQueryResultAccounts>(existsAccountQuery)
    .then((result) => (
      result.rows.length > 0 && result.rows[0].admin1_exists
    ))
);

export const createTables = async () => (
  dbClient.query(schema)
);

interface ExistQueryResult extends QueryResultRow {
  exists: boolean;
}

export const checkIfExistsTables = async () => (
  dbClient.query<ExistQueryResult>(ifExistsAccounts)
    .then((result) => result.rows[0]?.exists ?? false)
);

export default {};
