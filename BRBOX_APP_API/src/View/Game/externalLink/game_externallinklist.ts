import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import Game from "..";
import ExternalLinkList from "./externalLinkList";

@Entity()
export default class Game_ExternalLinkList {
    @PrimaryGeneratedColumn()
    id: number
    
    @OneToOne(() => Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game

    @OneToOne(()=>ExternalLinkList)
    @JoinColumn({referencedColumnName: "id"})
    externalLinkList : ExternalLinkList
}