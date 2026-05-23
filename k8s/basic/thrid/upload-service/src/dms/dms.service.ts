import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeneratePresignedUrlResponse, GeneratePresignedUrl } from './dms.dto';
import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class DmsService {
  private readonly client: S3Client;
  private readonly bucketName: string =
    this.configService.get<string>('S3_BUCKET_NAME');

  constructor(private readonly configService: ConfigService) {
    const s3_region = this.configService.get<string>('S3_REGION');

    this.client = new S3Client({
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      region: s3_region,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async getPresignedSignedUrl(
    payload: GeneratePresignedUrl,
  ): Promise<GeneratePresignedUrlResponse> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: payload.key,
      });

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 3600,
      });

      return { url };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllObjects() {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
      });

      const response = await this.client.send(command);

      return response.Contents || [];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
