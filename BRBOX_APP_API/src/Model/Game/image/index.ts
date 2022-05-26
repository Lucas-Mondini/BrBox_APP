import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import externalLink from "../externalLink";

@Entity()
export default class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    link: string;
}