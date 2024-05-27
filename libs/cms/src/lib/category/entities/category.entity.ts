import { AbstractEntity } from '#libs/common';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Exclude()
@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Expose()
  @Column()
  code!: string;

  @Expose()
  @Column()
  name!: string;
}
