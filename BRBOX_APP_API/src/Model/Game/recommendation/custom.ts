import { Entity, PrimaryGeneratedColumn,OneToOne, JoinColumn, Column } from "typeorm";
import Game from "..";
import User from "../../User";

@Entity()
export default class CustomRecommendation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order: number;

    @OneToOne(()=>Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game;

    @OneToOne(()=>User)
    @JoinColumn({referencedColumnName: "id"})
    user: User;
}