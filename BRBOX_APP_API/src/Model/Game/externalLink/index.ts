import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Platform from "../platform";

@Entity()
export default class ExternalLink {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Platform, {nullable: false})
    platform: Platform = new Platform();

    @Column()
    link: string

    @Column({nullable: true})
    imageURL: string = this.platform.imageURL;

    @Column({nullable: true})
    promotion: Boolean = false;

}