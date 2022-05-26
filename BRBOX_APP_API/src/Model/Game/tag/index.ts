import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    platform_name: string

    // @Column()
    // thumbnail: string

    @Column()
    link: string

}