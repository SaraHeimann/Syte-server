import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getAllCatalogs() {
    return this.catalogService.getAllCatalogs();
  }

  @Post()
  async addCatalog(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.addCatalog(createCatalogDto);
  }

  @Patch(':id')
  async updateCatalog(
    @Param('id') id: string,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    return this.catalogService.updateCatalog(id, updateCatalogDto);
  }

  @Delete(':id')
  async deleteCatalog(@Param('id') id: string) {
    return this.catalogService.deleteCatalog(id);
  }

  @Delete()
  async deleteMultipleCatalogs(@Body('ids') ids: string[]) {
    return this.catalogService.deleteMultipleCatalogs(ids);
  }
}
