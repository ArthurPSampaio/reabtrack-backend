import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { CreatePlanoDto } from './dto/create-plano.dto';

@Controller('planos')
export class PlanosController {
    constructor(private readonly planosService: PlanosService) {}

    @Post()
    create(@Body() createPlanoDto: CreatePlanoDto) {
        return this.planosService.create(createPlanoDto);
    }  

    @Get()
    findAll() {
        return this.planosService.findAll();
    }

    @Get('por-paciente/:pacienteId')
    findAllByPaciente(@Param('pacienteId') pacienteId: string) {
        return this.planosService.findAllByPaciente(pacienteId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.planosService.findOne(id);
    }
}
