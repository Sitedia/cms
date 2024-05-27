import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    return <CategoryDto>{ code: 'myPage', name: 'My page' };
  }

  findAll() {
    return [<CategoryDto>{ code: 'myPage', name: 'My page' }];
  }

  findOne(id: string) {
    return <CategoryDto>{ code: 'myPage', name: 'My page' };
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return <CategoryDto>{ code: 'myPage', name: 'My page' };
  }

  delete(id: string) {
    return;
  }
}
