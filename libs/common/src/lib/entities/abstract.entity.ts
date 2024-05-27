import { Exclude, Expose } from 'class-transformer';
import { Column, PrimaryColumn } from 'typeorm';

@Exclude()
export class AbstractEntity {
  @PrimaryColumn()
  @Expose()
  id!: string;

  @Column()
  @Expose()
  createdAt!: string;

  @Column()
  @Expose()
  lastUpdatedAt!: string;
}
