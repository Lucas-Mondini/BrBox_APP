import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  acronym: string;

  @Column({ type: 'simple-json' })
  countries: string[];

  @Column({ type: 'simple-json' })
  currency: {
    code: string;
    sign: string;
    delimiter: string;
    left: boolean;
    name: string;
    html: string;
  };
}