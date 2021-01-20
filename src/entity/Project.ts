import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    Generated,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { City } from './City';
import { ResidentManager } from './ResidentManager';
import { ProjectManager } from './ProjectManager';
import { FileStorage } from "./FileStorage";
import { DesignPackage } from "./DesignPackage";
import { ProjectStatus } from "./ProjectStatus";

@Entity()
@Unique(["jobNumber"])
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    //START Location information
    @Column()
    legalEntity: string;
    
    @Column()
    portfolio: string;
    
    @Column()
    address: string;
    
    @Column()
    unit: string;
    
    @ManyToOne(type => City)
    city: City; //cityId
    
    @Column()
    zip: string;
    
    @Column()
    bedrooms: number;
    
    @Column()
    bathrooms: number;
    
    @Column()
    sqFt: number;
    
    @Column()
    jobNumber: string;
    
    @ManyToOne(type => ResidentManager)
    residentManager: ResidentManager; //residentManagerId
    //END Location information

    @ManyToOne(type => ProjectManager)
    projectManager: ProjectManager; //projectManagerId

    @ManyToOne(type => DesignPackage)
    designPackage: DesignPackage; //designPackageId

    @ManyToOne(type => FileStorage)
    @JoinColumn({ name: "rqForm_id" }) //rqForm_id
    rqForm: FileStorage;

    @ManyToMany(type => FileStorage, {
        cascade: ["update"]
    })
    @JoinTable()
    drawings: FileStorage[];

    @ManyToOne(type => ProjectStatus)
    projectStatus: ProjectStatus; //ProjectStatusId

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

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