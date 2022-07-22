import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import User from ".";


@Entity()
export default class Code {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=>User, {nullable: false})
    @JoinColumn({referencedColumnName: "id"})
    user: User

    @Column({ nullable: false })
    code: string
}