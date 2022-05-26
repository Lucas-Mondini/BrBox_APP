import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import Image from ".";
import Game from "../game";

@Entity()
export default class ImageList {
    @PrimaryGeneratedColumn()
    id: number
    
    @OneToMany(()=>Image, Object)
    @JoinColumn({referencedColumnName: "id"})
    images: Image[]
}