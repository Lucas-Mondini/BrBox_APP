import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import Game_ExternalLinkList from "./externalLink/game_externallinklist";
import Game_ImageList from "./image/game_ImageList";
import Game_TagValueList from "./tag/game_tagValueList";

@Entity()
export default class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToOne(() => Game_ExternalLinkList)
    @JoinColumn({referencedColumnName: "id"})
    externalLinks: Game_ExternalLinkList;

    @OneToOne(() => Game_ImageList)
    @JoinColumn({referencedColumnName: "id"})
    imageList: Game_ImageList;

    @OneToOne(() => Game_TagValueList)
    @JoinColumn({referencedColumnName: "id"})
    tagList: Game_TagValueList;

    @CreateDateColumn()
    createdDate: Date
}