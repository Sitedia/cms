import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module.js';

@Module({
  imports: [CategoryModule],
})
export class CmsModule {}
