import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import Game from "..";
import ImageList from "./imageList";

@Entity()
export default class Game_ImageList {
    @PrimaryGeneratedColumn()
    id: number
    
    @OneToOne(() => Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game

    @OneToOne(()=>ImageList, Object)
    @JoinColumn({referencedColumnName: "id"})
    imageList : ImageList
}