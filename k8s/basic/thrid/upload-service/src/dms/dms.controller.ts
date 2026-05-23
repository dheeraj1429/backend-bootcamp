import { Body, Controller, Get, Put } from '@nestjs/common';
import { GeneratePresignedUrl, GeneratePresignedUrlResponse } from './dms.dto';
import { DmsService } from './dms.service';

@Controller('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @Put('generate-presigned-url')
  async getPresignedSignedUrl(
    @Body() payload: GeneratePresignedUrl,
  ): Promise<GeneratePresignedUrlResponse> {
    return this.dmsService.getPresignedSignedUrl(payload);
  }

  @Get('all')
  async getAllObjects() {
    return this.dmsService.getAllObjects();
  }
}
