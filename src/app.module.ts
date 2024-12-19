import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
import { MulterModule } from '@nestjs/platform-express/multer'; 

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', 
      limits: { fileSize: 10 * 1024 * 1024 }, // The directory where files will be stored temporarily
    }),
  ],
  controllers: [AppController], // Add AppController to the controllers array
  providers: [],
})
export class AppModule {}
