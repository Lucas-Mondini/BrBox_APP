import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import Game from "..";
import TagValueList from "./tagValueList";

@Entity()
export default class Game_TagValueList {
    @PrimaryGeneratedColumn()
    id: number
    
    @OneToOne(() => Game)
    @JoinColumn({referencedColumnName: "id"})
    game: Game

    @OneToOne(()=>TagValueList, Object)
    @JoinColumn({referencedColumnName: "id"})
    TagValueList : TagValueList
}