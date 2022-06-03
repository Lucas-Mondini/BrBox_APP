import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Platform from "../platform";

@Entity()
export default class ExternalLink {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Platform, {nullable: false})
    platform: Platform

    @Column()
    link: string

}