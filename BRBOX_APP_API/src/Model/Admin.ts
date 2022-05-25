import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity()
export default class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn({referencedColumnName: "id"})
    user: User;
}