import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from "./dtos/create-cat.dto";
import { CatsService } from "./cats.service";
import { BusinessCat, Cat } from "./entities/cat";

@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  create(@Body() createCatDto: CreateCatDto): string {
    this.catsService.create(BusinessCat.fromCreatedCat(createCatDto));
    return 'A new cat was created!';
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/custom')
  findAllWithRequest(@Req() request: Request): string {
    const req = JSON.stringify(request.body);
    return `This action returns all cats from ${req}!`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    //findOne(@Param() { id }: any): string {
    return `This action returns a #${id} cat`;
  }
}