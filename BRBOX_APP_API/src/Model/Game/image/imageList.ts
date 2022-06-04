import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import Image from ".";

@Entity()
export default class ImageList {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(()=>Image, {nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    images: Image[]
}