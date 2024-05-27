import { MigrationInterface, QueryRunner } from 'typeorm';

export class Myupdate1716534907528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE SCHEMA IF NOT EXISTS cms;

        CREATE TABLE cms.documents (
            id VARCHAR(32) NOT NULL,
            created_at VARCHAR(32) NOT NULL,
            last_updated_at VARCHAR(32) NOT NULL,
            code VARCHAR(32),
            type VARCHAR(32) NOT NULL,
            title TEXT,
            description TEXT,
            image_url VARCHAR(512),
            content TEXT,
            status VARCHAR(32) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE (code),
        );

        CREATE TABLE cms.document_links (
          id VARCHAR(32) NOT NULL,
          created_at VARCHAR(32) NOT NULL,
          last_updated_at VARCHAR(32) NOT NULL,
          source_document_id VARCHAR(32) NOT NULL,
          target_document_id VARCHAR(32) NOT NULL,
          type VARCHAR(64),
          PRIMARY KEY (id),
          UNIQUE (source_document_id, target_document_id),
          FOREIGN KEY(source_document_id) REFERENCES cms.documents(id),
          FOREIGN KEY(target_document_id) REFERENCES cms.documents(id)
        );
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          DROP TABLE cms.page_links CASCADE;
          DROP TABLE cms.pages CASCADE
      `,
    );
  }
}
