import { MigrationInterface, QueryRunner } from 'typeorm';

export class Myupdate1716534907528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE SCHEMA IF NOT EXISTS cms;

        CREATE TABLE cms.categories (
            id VARCHAR(32) NOT NULL,
            created_at VARCHAR(32) NOT NULL,
            last_updated_at VARCHAR(32) NOT NULL,
            code VARCHAR(512),
            name VARCHAR(512) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE (code),
        );
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          DROP TABLE cms.categories CASCADE;
      `,
    );
  }
}
