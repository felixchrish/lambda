import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { Handler, Context, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

export async function bootstrap(): Promise<Handler> {
  if (!server) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // Initialize NestJS App
    await app.init();

    // Create the Serverless Express handler
    server = serverlessExpress({ app: expressApp });
  }
  return server;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback<any>
) => {
  const server = await bootstrap();
  return server(event, context, callback); // Pass the callback argument
};
