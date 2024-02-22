import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { CatsModule } from '@/cats/cats.module';
import { UsersModule } from '@/users/users.module';


@Module({
    imports: [
        CatsModule,
        MongooseModule.forRoot('mongodb+srv://abroudoux:M7i24gaKd33hOpeB@cluster0.vxt85wi.mongodb.net/?retryWrites=true&w=majority'),
        UsersModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'cats-client', 'dist'),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
