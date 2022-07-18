import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    icon: number;

    @Column({unique: true})
    name: string

    @Column()
    description_positive: string

    @Column()
    description_neutral: string

    @Column()
    description_negative: string

}