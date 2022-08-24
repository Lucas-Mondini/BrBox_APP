import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import Game from "..";

@Entity()
export default class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string;

    @Column()
    description: string;
}