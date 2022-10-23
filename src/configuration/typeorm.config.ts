import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { getDbDialect } from '@/utils/getDbDialect.utils';

@Injectable()
export class DatabaseConfigurationService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      TYPEORM_ENTITIES,
      TYPEORM_MIGRATIONS,
      DB_HOST,
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      DB_PORT,
      DB_LOGGING,
      NODE_ENV,
    } = process.env;

    const dbDialect = getDbDialect();
    const entities = TYPEORM_ENTITIES || 'dist/**/*.entity.js';
    const migrations = TYPEORM_MIGRATIONS || 'dist/src/migration/**/*.js';

    return {
      type: dbDialect,
      host: DB_HOST,
      port: parseInt(DB_PORT, 10) || 5433,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [entities],
      logging: DB_LOGGING === '1',
      // synchronize: false,
      synchronize: true,
      migrations: [migrations],
      subscribers: [
        'dist/src/subscriber/**/*.js',
        'dist/src/**/*.subscriber.js',
      ],
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        // This bypasses ssl errors on mssql for non production builds
        trustServerCertificate: NODE_ENV !== 'production',
      },
    };
  }
}
