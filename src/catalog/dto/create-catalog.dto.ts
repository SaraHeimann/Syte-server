import {
  IsString,
  Matches,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateCatalogDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only letters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Vertical is required' })
  vertical: string;

  @IsBoolean()
  isPrimary?: boolean;

  @IsArray()
  @ArrayNotEmpty({ message: 'Locales must contain at least one locale' })
  locales: string[];
}
