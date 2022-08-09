import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import ImageList from "./image/imageList";
import TagValueList from "./tag/tagValueList";
import ExtternalLinkList from "./externalLink/externalLinkList"
import BusinessModelList from "./businessModel/businessModelList";
import Genre from "./classification/genre";
import Mode from "./classification/mode";

@Entity()
export default class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({nullable: false, default: false})
    DLC: boolean;

    @OneToOne(() => ExtternalLinkList, {eager: true, nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinColumn({referencedColumnName: "id"})
    linkList: ExtternalLinkList;

    @OneToOne(() => ImageList, {eager: true, nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinColumn({referencedColumnName: "id"})
    imageList: ImageList;

    @OneToOne(() => TagValueList, {eager: true, nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinColumn({referencedColumnName: "id"})
    tagList: TagValueList;

    @OneToOne(() => BusinessModelList, {eager: true, nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinColumn({referencedColumnName: "id"})
    businessModelList: BusinessModelList;

    @ManyToMany(()=> Genre, {eager: true, nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    genres: Genre[]

    @ManyToMany(()=> Mode, {eager: true, nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    modes: Mode[]

    @CreateDateColumn()
    createdDate: Date
}