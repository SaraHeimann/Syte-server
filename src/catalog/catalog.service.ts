import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './catalog.schema';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>,
  ) {}

  async addCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    const { name, vertical, isPrimary } = createCatalogDto;

    const existingCatalog = await this.catalogModel.findOne({ name });
    if (existingCatalog) {
      throw new BadRequestException('Catalog with this name already exists');
    }

    if (isPrimary) {
      const existingPrimaryCatalog = await this.catalogModel.findOne({
        vertical,
        isPrimary: true,
      });

      if (existingPrimaryCatalog) {
        await this.catalogModel.updateOne(
          { _id: existingPrimaryCatalog._id },
          { $set: { isPrimary: false } },
        );
      }
    }

    const catalog = new this.catalogModel(createCatalogDto);
    return catalog.save();
  }

  async getAllCatalogs(): Promise<Catalog[]> {
    return this.catalogModel.find().exec();
  }

  async updateCatalog(
    id: string,
    updateCatalogDto: Partial<Catalog>,
  ): Promise<Catalog> {
    const catalog = await this.catalogModel.findById(id);
    if (!catalog) {
      throw new NotFoundException('Catalog not found');
    }
    catalog.indexedAt = new Date();

    if (updateCatalogDto.isPrimary) {
      await this.catalogModel.updateMany(
        { vertical: catalog.vertical, isPrimary: true, _id: { $ne: id } },
        { isPrimary: false },
      );
    }

    Object.assign(catalog, updateCatalogDto);
    return catalog.save();
  }

  async deleteCatalog(id: string): Promise<void> {
    const result = await this.catalogModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Catalog not found');
    }
  }

  async deleteMultipleCatalogs(ids: string[]): Promise<void> {
    const result = await this.catalogModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      throw new NotFoundException('No catalogs were deleted.');
    }
  }
}
