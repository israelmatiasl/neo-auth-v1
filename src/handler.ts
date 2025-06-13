import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule, 
        new ExpressAdapter(),
        { 
            logger: ['error', 'warn'],
            abortOnError: false 
        }
    );

    app.setGlobalPrefix('api');
    
    await app.init();

    const expressInstance = app.getHttpAdapter().getInstance();
    
    return serverlessExpress({ app: expressInstance });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback
) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};