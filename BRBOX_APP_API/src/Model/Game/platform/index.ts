import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";

@Entity()
export default class Platform {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

}