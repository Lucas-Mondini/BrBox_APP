import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import ImageList from "./image/imageList";
import TagValueList from "./tag/tagValueList";
import ExtternalLinkList from "./externalLink/externalLinkList"

@Entity()
export default class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToOne(() => ExtternalLinkList, {eager: true, nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinColumn({referencedColumnName: "id"})
    linkList: ExtternalLinkList;

    @OneToOne(() => ImageList, {eager: true, nullable: true, cascade: true, onDelete: "CASCADE"})
    @JoinColumn({referencedColumnName: "id"})
    imageList: ImageList;

    @OneToOne(() => TagValueList, {eager: true, nullable: true, cascade: true, onDelete: "CASCADE"})
    @JoinColumn({referencedColumnName: "id"})
    tagList: TagValueList;

    @CreateDateColumn()
    createdDate: Date
}