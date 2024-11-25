import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from './catalog.schema';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<Catalog>,
  ) {}

  async create(data: Partial<Catalog>): Promise<Catalog> {
    const newCatalog = new this.catalogModel(data);
    return newCatalog.save();
  }

  async findAll(): Promise<Catalog[]> {
    return this.catalogModel.find().exec();
  }
}
