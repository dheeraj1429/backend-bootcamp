import { IsNotEmpty, IsString } from 'class-validator';

export class GeneratePresignedUrl {
  @IsString()
  @IsNotEmpty()
  readonly key: string;
}

export class GeneratePresignedUrlResponse {
  readonly url: string;
}
