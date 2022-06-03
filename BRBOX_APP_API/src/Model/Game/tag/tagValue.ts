import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, ManyToMany } from "typeorm";
import Tag from ".";
import User from "../../User";
import TagValueList from "./tagValueList";
import Value from "./value";

@Entity()
export default class TagValue {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Tag)
    @JoinColumn({referencedColumnName: "id"})
    tag: Tag;

    @ManyToOne(()=> User)
    @JoinColumn({referencedColumnName: "id"})
    user: User

    @ManyToOne(() => Value)
    @JoinColumn({referencedColumnName: "id"})
    value: Value;
}