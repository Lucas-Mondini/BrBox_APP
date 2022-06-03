import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import ExternalLink from ".";

@Entity()
export default class ExternalLinkList {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(()=>ExternalLink, {nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    externalLinks : ExternalLink[]

}