import { Ingredient as base } from '@matok/data';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient implements base {
  @PrimaryGeneratedColumn()
  id: number;
  @Column() name: string;
  @Column() price: number;
  @Column() weight: string;
}
