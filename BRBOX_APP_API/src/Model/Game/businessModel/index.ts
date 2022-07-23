import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class BusinessModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    description: string

}