import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ErrorDTO {
  @Expose()
  @ApiProperty({ type: 'string', format: 'text', maxLength: 8096 })
  message!: string;
}
