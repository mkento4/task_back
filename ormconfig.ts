// import TypeOrmNamingStrategy from './src/config/TypeORMStrategy';

const ORMConfig = {
  type: 'mysql',
  host: 'develop-works.com',
  port: 3306,
  username: 'development',
  password: 'development',
  database: 'test_schema',
  synchronize: false,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  // namingStrategy: new TypeOrmNamingStrategy(),
};

// typeORM の雑魚設定に合わせる
export = ORMConfig;
