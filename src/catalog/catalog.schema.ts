import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatalogDocument = HydratedDocument<Catalog>;

@Schema()
export class Catalog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['fashion', 'home', 'general'] })
  vertical: string;

  @Prop({ default: false })
  isPrimary: boolean;

  @Prop({ type: [String], required: true })
  locales: string[];

  @Prop({ type: Date, default: () => new Date() })
  indexedAt: Date;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
