import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';

import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express'; // Import types explicitly
import multer from 'multer';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    // Initialize and configure Express
    const expressApp = express();

    // Ensure the uploads folder exists
    const uploadDir = path.resolve(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Uploads folder created');
    }

    // Set up multer storage configuration
    const upload = multer({
      dest: 'uploads/', // specify the folder where uploaded files will be stored
    });

    const stage = process.env.IS_OFFLINE ? '/dev' : '';

    // Create a router and define routes
    const router = express.Router();

    router.get('/', (_req: Request, res: Response) => {
      res.send('Hello! The server is working.');
    });

    router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
      console.log('Uploaded file:', req.file); // Log the uploaded file info
      res.send('File uploaded successfully!');
    });

    // Use the router with the stage prefix
    expressApp.use(`${stage}/`, router);

    // Initialize NestJS with the Express adapter
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    nestApp.enableCors();
    await nestApp.init();

    // Wrap the express app with serverless
    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
