import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DmsModule } from './dms/dms.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        S3_ACCESS_KEY: Joi.string().required(),
        S3_SECRET_ACCESS_KEY: Joi.string().required(),
        S3_REGION: Joi.string().required(),
        S3_BUCKET_NAME: Joi.string().required(),
        S3_ENDPOINT: Joi.string().required(),
      }),
    }),
    DmsModule,
  ],
})
export class AppModule {}
