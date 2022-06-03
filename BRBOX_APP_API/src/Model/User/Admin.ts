import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, IsNull } from "typeorm";
import User from ".";

@Entity()
export default class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, {nullable: false})
    @JoinColumn({referencedColumnName: "id"})
    user: User;
}