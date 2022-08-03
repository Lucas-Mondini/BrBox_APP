import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import Game from "..";


@Entity()
export default class Mode {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string;

    @ManyToMany(()=>Game, {nullable: false})
    @JoinTable()
    games: Game[];
}