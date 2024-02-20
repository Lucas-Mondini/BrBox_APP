import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import Game from "..";

@Entity()
export default class GameITAD_IDs {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    ITADId: string;

    @Column({ nullable: false })
    ITADIdStoreID: string;

    @ManyToOne(() => Game, (game) => game.GameITAD_IDs)
    gameId: Game
}