import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import Game from "../game";
import ImageList from "./imageList";

@Entity()
export default class Game_ExternalLinkList {
    @OneToOne(() => Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game

    @OneToOne(()=>ImageList, Object)
    @JoinColumn({referencedColumnName: "id"})
    imageList : ImageList
}