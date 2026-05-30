import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeqLoggerModule } from '@jasonsoft/nestjs-seq';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SeqLoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        serverUrl: configService.get<string>('SEQ_SERVER_URL'),
        apiKey: configService.get<string>('SEQ_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
