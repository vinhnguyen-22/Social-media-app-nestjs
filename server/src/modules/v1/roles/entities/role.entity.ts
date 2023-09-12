import { Allow } from 'class-validator';
import { EntityHelper } from 'src/modules/v1/utils/entity-helper';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class Role extends EntityHelper {
  @PrimaryColumn()
  id: number;

  @Allow()
  @Column()
  name?: string;
}
