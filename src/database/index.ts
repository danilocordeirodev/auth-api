import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './strategies/snake_naming.stratety';
import { NODE_ENV } from 'src/app/constants/app.constants';
import { AuthenticationSubscriber } from 'src/authentication/subscriber/authentication.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        logging: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        extra: { charset: 'utf8mb4_unicode_ci' },
        subscribers: [AuthenticationSubscriber],
      }),
    }),
  ],
})
export class DatabaseModule {}
