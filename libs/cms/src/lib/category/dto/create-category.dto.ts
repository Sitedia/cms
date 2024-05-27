import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

@Exclude()
export class CreateCategoryDto {
  @ApiProperty({ required: true })
  @Expose()
  @IsString()
  @Length(2, 512)
  code!: string;

  @ApiProperty({ required: true })
  @Expose()
  @IsString()
  @Length(2, 512)
  name!: string;
}
