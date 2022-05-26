import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import ExternalLinkList from "./externalLinkList";

@Entity()
export default class ExternalLink {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    platform_name: string

    @Column()
    thumbnail: string

    @Column()
    link: string

}