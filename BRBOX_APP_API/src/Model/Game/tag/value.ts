import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export default class Value {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string
}