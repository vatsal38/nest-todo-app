import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pId: string;

  constructor(id: number, name: string, pId: string) {
    super();
    this.id = id;
    this.name = name;
    this.pId = pId;
  }
}
