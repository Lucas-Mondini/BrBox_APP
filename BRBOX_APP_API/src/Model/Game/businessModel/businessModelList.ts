import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import BusinessModel from ".";

@Entity()
export default class BusinessModelList {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(()=>BusinessModel, {nullable: false, cascade: true, onDelete: "CASCADE"})
    @JoinTable()
    businessModels: BusinessModel[]
}