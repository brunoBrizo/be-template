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
};

export const ERROR_CODES = {
  // Postgresql duplicate value error code
  DB_DUPLICATE_VALUE: '23505',
};

export const PASSWORD_MAX_LENGTH = 32;
export const PHONE_MAX_LENGTH = 25;
