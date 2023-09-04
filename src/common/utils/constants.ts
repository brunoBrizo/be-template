export const MESSAGES = {
  EMAIL_REQUIRED: 'Email é obrigatório',
  EMAIL_NOT_VALID: 'Email inválido',
  PASSWORD_REQUIRED: 'Senha é obrigatória',
  PASSWORD_VALIDATION_ERROR:
    'A senha deve conter letras maiúsculas e minúsculas, pelo menos 1 número ou caractere especial, entre 8 e 32 caracteres',
  FIRST_NAME_REQUIRED: 'Nome é obrigatório',
  LAST_NAME_REQUIRED: 'Sobrenome é obrigatório',
  ID_REQUIRED: 'Documento é obrigatório',
  DATE_OF_BIRTH_REQUIRED: 'Data de nascimento é obrigatória',
  DATE_LESS_THAN_TODAY: 'A data deve ser menor ou igual a hoje',
  ADDRESS_REQUIRED: 'Endereço é obrigatório',
  CITY_REQUIRED: 'Cidade é obrigatória',
  PHONE_NUMBER_REQUIRED: 'Telefone é obrigatório',
  COUNTRY_REQUIRED: 'País é obrigatório',
  INVALID_TOKEN: 'Token inválido',
  INVALID_EMAIL_OR_PASSWORD: 'Email ou senha inválidos',
  COUNTRY_NOT_FOUND: 'País não encontrado',
  EMAIL_ALREADY_EXISTS: 'Email já cadastrado',
  REFRESH_OK: 'Token atualizado com sucesso',
  UNAUTHORIZED: 'Não autorizado',
  LOGIN_OK: 'Login realizado com sucesso',
  TOKEN_EXPIRED: 'Token expirado',
};

export const ENV_VARS = {
  DB_HOST: 'DB_HOST',
  DB_PORT: 'DB_PORT',
  DB_USERNAME: 'DB_USERNAME',
  DB_PASSWORD: 'DB_PASSWORD',
  DB_NAME: 'DB_NAME',
  DB_SYNCHRONIZE: 'DB_SYNCHRONIZE',
  DB_MIGRATIONS_RUN: 'DB_MIGRATIONS_RUN',
  PORT: 'PORT',
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
  WEB_APP_URL: 'WEB_APP_URL',
  EMAIL_SERVICE: 'EMAIL_SERVICE',
  EMAIL_USER: 'EMAIL_USER',
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
  EMAIL_FROM: 'EMAIL_FROM',
};

export const ERROR_CODES = {
  // Postgresql duplicate value error code
  DB_DUPLICATE_VALUE: '23505',
};

export const PASSWORD_MAX_LENGTH = 32;
export const PHONE_MAX_LENGTH = 25;

export const JWT_DEFAULT_STRATEGY = 'jwt';

export const EMAIL_MESSAGES = {
  PASSWORD_RESET_SUBJECT: 'Mudança de senha',
  ACCOUNT_CREATED_SUBJECT: 'Conta criada com sucesso',
};
