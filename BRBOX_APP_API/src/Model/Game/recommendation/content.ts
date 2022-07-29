import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import Game from "..";

@Entity()
export default class ContentRecommendation {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=>Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game;

}