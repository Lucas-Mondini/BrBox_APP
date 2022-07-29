import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Game from "..";

@Entity()
export default class SimilaritiesRecommendation {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=>Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game;
}