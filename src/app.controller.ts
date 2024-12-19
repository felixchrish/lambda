import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('mq') 
export class AppController {

  @Get('test') 
  getHello(): string {
    return 'Hello World!';
  }

  @Post('upload') 
  @UseInterceptors(FileInterceptor('file'))  
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    console.log(file);  
    return `File uploaded: ${file.originalname}`;  
  }
}
