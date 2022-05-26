import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import Game from "../game";
import TagValue from "./tagValue";

@Entity()
export default class TagValueList {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => TagValue, Object)
    @JoinColumn({referencedColumnName: "id"})
    tagValues: TagValue[];

}