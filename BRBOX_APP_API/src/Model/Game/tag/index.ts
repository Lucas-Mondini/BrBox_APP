import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

}