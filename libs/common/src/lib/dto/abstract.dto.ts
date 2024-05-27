import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AbstractDTO {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  createdAt!: string;

  @Expose()
  @ApiProperty()
  lastUpdatedAt!: string;
}
