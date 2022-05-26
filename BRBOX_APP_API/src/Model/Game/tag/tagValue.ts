import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import Tag from ".";
import User from "../../User";
import Value from "./value";

@Entity()
export default class TagValue {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Tag)
    @JoinColumn({referencedColumnName: "id"})
    tag: Tag;

    @OneToOne(()=> User)
    @JoinColumn({referencedColumnName: "id"})
    user: User

    @OneToMany(() => Value, Object)
    @JoinColumn({referencedColumnName: "id"})
    value: Value;
}