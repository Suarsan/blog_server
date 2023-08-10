import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: buildDataSourceOptions
})

export function buildDataSourceOptions(config: ConfigService): DataSourceOptions {
    return {
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        migrations: ['./**/migrations/*.js'],
        entities: ['./**/dist/**/*.entity.js'],
        logging: config.get("DB_LOGGING"),
        synchronize: false
    } as DataSourceOptions;
}
