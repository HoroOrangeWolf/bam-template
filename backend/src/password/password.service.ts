import bcrypt from 'bcrypt';

const SALT_ROUNDS = 11;

const hashPassword = (password: string) => (
  bcrypt.hashSync(password, SALT_ROUNDS)
);

const comparePassword = (hashedPassword: string, password: string) => (
  bcrypt.compareSync(password, hashedPassword)
);

const PasswordService = {
  hashPassword,
  comparePassword,
};

export default PasswordService;
