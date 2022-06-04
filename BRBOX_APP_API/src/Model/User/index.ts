import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    Password: string

    @Column({unique: true})
    email: string

    @CreateDateColumn()
    createdDate: Date
}