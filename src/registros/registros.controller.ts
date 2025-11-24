import { Controller, Post, Body, Delete, Param, Patch, Get } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';

@Controller('registros')
export class RegistrosController {
  constructor(private readonly registrosService: RegistrosService) {}

  @Post()
  create(@Body() createRegistroDto: CreateRegistroDto) {
    return this.registrosService.create(createRegistroDto);
  }

  @Get()
  findAll() {
    return this.registrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrosService.findOne(id);
  }

  @Get('por-paciente/:pacienteId')
  findByPaciente(@Param('pacienteId') pacienteId: string) {
    return this.registrosService.findByPaciente(pacienteId);
  }

  @Get('por-plano/:planoId')
  findByPlano(@Param('planoId') planoId: string) {
    return this.registrosService.findByPlano(planoId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRegistroDto) {
    return this.registrosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrosService.remove(id);
  } 
}