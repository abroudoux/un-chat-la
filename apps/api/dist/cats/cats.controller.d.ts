import { CreateCatDto } from '@/cats/dto/create-cat.dto';
import { UpdateCatDto } from '@/cats/dto/update-cat.dto';
import { CatsService } from '@/cats/cats.service';
import { Cat } from '@/cats/models/cat.model';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    getCats(): Promise<Cat[]>;
    getCat(id: string): Promise<Cat>;
    createCat(createCatDto: CreateCatDto): Promise<Cat>;
    deleteCat(id: string): Promise<Cat>;
    updateCat(updateCatDto: UpdateCatDto, id: string): Promise<Cat>;
}
