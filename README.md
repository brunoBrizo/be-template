# PsicoAmin API


# Installation

Copy `.env.EXAMPLE ` to `.env.dev` for development

## Install dependencies

```bash
$ yarn
```

## Run

```bash
$ yarn dev
```

### Run ESLint

```bash
$ yarn lint
```

### Build Project

```bash
$ yarn build
```

## Test

To run all tests:
```bash
$ yarn test
```

### Unit test
To run all unit tests:
```bash
$ yarn test:unit
```

# Migrations
All tables can be created by setting `DB_SYNCHRONIZE = true` in `.env.dev`, or you can run migrations.

## Generating Migrations
To generate a migration you can run the following command:
```bash
$ yarn migrations:generate src/migrations/MIGRATION_NAME
```
## Running Migrations
To run all pending migrations:
```bash
$ yarn migrations:run
```
## Reverting Migrations
To revert the last applied migration:
```bash
$ yarn migrations:revert
```
