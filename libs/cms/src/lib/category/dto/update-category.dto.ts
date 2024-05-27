import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

@Exclude()
export class UpdateCategoryDto {
  @ApiProperty({ required: false })
  @Expose()
  @IsString()
  @IsOptional()
  @Length(2, 512)
  code?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsString()
  @IsOptional()
  @Length(2, 512)
  name?: string;
}
