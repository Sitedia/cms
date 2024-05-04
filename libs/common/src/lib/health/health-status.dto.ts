import { ApiProperty } from '@nestjs/swagger';

export class HealthStatusDTO {
  @ApiProperty({ description: 'Status of the application', required: true, enum: ['OK'] })
  status!: 'OK';
}
