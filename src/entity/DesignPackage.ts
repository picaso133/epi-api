import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    Generated,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { State } from "./State";
import { Project } from "./Project";

@Entity()
export class DesignPackage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}