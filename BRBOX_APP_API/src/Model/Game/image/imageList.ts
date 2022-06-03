import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import Image from ".";

@Entity()
export default class ImageList {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(()=>Image, {nullable: false})
    @JoinTable()
    images: Image[]
}