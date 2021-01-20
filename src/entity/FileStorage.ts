import {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    Column,
    Unique,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
@Unique(["md5"])
export class FileStorage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    fileName: string;

    @Column()
    @IsNotEmpty()
    filePath: string;

    @Column()
    @IsNotEmpty()
    mimetype: string;

    @Column()
    @IsNotEmpty()
    size: number;

    @Column()
    @IsNotEmpty()
    md5: string;

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