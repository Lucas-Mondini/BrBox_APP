import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import Game from "../game";
import TagValueList from "./tagValueList";

@Entity()
export default class Game_TagValueList {
    @OneToOne(() => Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game

    @OneToOne(()=>TagValueList, Object)
    @JoinColumn({referencedColumnName: "id"})
    TagValueList : TagValueList
}