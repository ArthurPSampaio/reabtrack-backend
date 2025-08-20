import { Controller, Post, Body } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { CreatePlanoDto } from './dto/create-plano.dto';

@Controller('planos')
export class PlanosController {
    constructor(private readonly planosService: PlanosService) {}

    @Post()
    create(@Body() createPlanoDto: CreatePlanoDto) {
        return this.planosService.create(createPlanoDto);
    }
}
