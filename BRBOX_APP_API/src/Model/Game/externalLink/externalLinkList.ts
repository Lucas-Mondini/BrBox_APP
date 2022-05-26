import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import ExternalLink from ".";
import Game from "../game";

@Entity()
export default class ExternalLinkList {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(()=>ExternalLink, Object)
    @JoinColumn({referencedColumnName: "id"})
    externalLinks : ExternalLink[]
}