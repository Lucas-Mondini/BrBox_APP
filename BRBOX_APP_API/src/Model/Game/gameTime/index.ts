import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinTable } from "typeorm"
import Game from ".."
import User from "../../User"

@Entity()
export default class GameTime {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>User, {nullable: false})
    user: User

    @ManyToOne(()=>Game, {nullable: false})
    game: Game

    @Column({nullable: false})
    time: number
}