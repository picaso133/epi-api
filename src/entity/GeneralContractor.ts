import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class GeneralContractor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    company: string;
    
    @Column()
    @IsNotEmpty()
    contactName: string;

    @Column()
    @IsNotEmpty()
    phone: string;

    @Column()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    orderEmail: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}