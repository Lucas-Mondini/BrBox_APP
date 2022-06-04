import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import Game from "..";
import TagValue from "./tagValue";

@Entity()
export default class TagValueList {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => TagValue, {nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    tagValues: TagValue[];

}