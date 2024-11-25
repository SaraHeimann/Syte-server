import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Catalog } from './catalog.schema';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getAll(): Promise<Catalog[]> {
    return this.catalogService.findAll();
  }

  @Post()
  async create(@Body() data: Partial<Catalog>): Promise<Catalog> {
    return this.catalogService.create(data);
  }
}
