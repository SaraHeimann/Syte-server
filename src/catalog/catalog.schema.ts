import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Catalog extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['fashion', 'home', 'general'] })
  vertical: string;

  @Prop({ default: false })
  isPrimary: boolean;

  @Prop({ type: [String], default: [] })
  locales: string[];

  @Prop({ default: Date.now })
  indexedAt: Date;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
