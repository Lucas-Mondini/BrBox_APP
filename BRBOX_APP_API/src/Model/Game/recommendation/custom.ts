import { Entity, PrimaryGeneratedColumn,OneToOne, JoinColumn } from "typeorm";
import Game from "..";

@Entity()
export default class CustomRecommendation {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=>Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game;
}