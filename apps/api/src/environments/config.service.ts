import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from './environment';

type configType = string | boolean | number | string[];
class ConfigService {
  constructor(private env: { [k: string]: configType }) {}

  private getValue<T>(key: keyof typeof environment): T {
    const value = this.env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }

    return <T>(value as unknown);
  }

  public ensureValues(keys: (keyof typeof environment)[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getPort() {
    return this.getValue('PORT');
  }

  public isProduction() {
    const mode = this.getValue('MODE');
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue<string>('POSTGRES_HOST'),
      port: this.getValue<number>('POSTGRES_PORT'),
      username: this.getValue<string>('POSTGRES_USER'),
      password: this.getValue<string>('POSTGRES_PASSWORD'),
      database: this.getValue<string>('POSTGRES_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(environment).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
