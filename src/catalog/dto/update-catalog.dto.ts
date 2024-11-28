import { CreateCatalogDto } from './create-catalog.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCatalogDto extends PartialType(CreateCatalogDto) {}
