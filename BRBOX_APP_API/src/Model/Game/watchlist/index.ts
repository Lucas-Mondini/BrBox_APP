import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, Column, ManyToMany, JoinTable } from "typeorm";
import Game from "..";
import User from "../../User";

@Entity()
export default class Watchlist {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(()=>Game)
    @JoinTable()
    games: Game[];

    @OneToOne(()=>User)
    @JoinColumn({referencedColumnName: "id"})
    user: User;
}