import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as url from 'url';
import * as path from 'path';

const getServeStaticModule = () => {
  if (import.meta.env.PROD) {
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'client'),
        exclude: ['/api*'],
      }),
    ];
  }

  return [];
};

@Module({
  imports: [...getServeStaticModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
