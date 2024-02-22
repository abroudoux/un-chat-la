import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

import { CreateCatDto } from '@/cats/dto/create-cat.dto';
import { UpdateCatDto } from '@/cats/dto/update-cat.dto';
import { CatsService } from '@/cats/cats.service';
import { Cat } from '@/cats/models/cat.model';


@Controller('cats')
export class CatsController {

    constructor(private readonly catsService : CatsService) {};

    // GET /cats?isAdopted= -> []
    @Get()
    async getCats() : Promise<Cat[]> {
        return await this.catsService.getCats();
    };

    // GET /cats/:id -> { ... }
    @Get(':id')
    getCat(@Param('id') id : string) : Promise<Cat> {
        return this.catsService.getCat(id);
    };

    // POST /cats
    @Post()
    createCat(@Body() createCatDto : CreateCatDto) : Promise<Cat> {
        return this.catsService.createCat(createCatDto);
    };

    // DELETE /cats/:id
    @Delete(':id')
    deleteCat(@Param('id') id : string) : Promise<Cat> {
        return this.catsService.deleteCat(id);
    };

    // PUT /cats/:id
    @Put(':id')
    updateCat(@Body() updateCatDto : UpdateCatDto, @Param('id') id : string) : Promise<Cat> {
        return this.catsService.updateCat(id, updateCatDto);
    };

};
