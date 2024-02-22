import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsController } from '@/cats/cats.controller';
import { CatsService } from '@/cats/cats.service';
import { CatsSchema } from '@/cats/models/cat.model';



@Module({
    imports: [MongooseModule.forFeature([{ name : 'Cat', schema : CatsSchema }])],
    controllers: [CatsController],
    providers: [CatsService]
})


export class CatsModule {}
