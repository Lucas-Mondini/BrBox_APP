import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import Game from "../game";
import ExternalLinkList from "./externalLinkList";

@Entity()
export default class Game_ExternalLinkList {
    @OneToOne(() => Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game

    @OneToOne(()=>ExternalLinkList, Object)
    @JoinColumn({referencedColumnName: "id"})
    externalLinkList : ExternalLinkList
}