import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Tag from "./tag";

@Entity()
export default class TagValue {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Tag)
    @JoinColumn({referencedColumnName: "id"})
    tag: Tag;

    @Column()
    tag_value: number;

}