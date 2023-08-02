import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RrssType } from "./rrssType.entity";

@Entity('rsss-connection')
export class RrssConnection {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ nullable: false, unique: true })
    name: string;
    
    @Column({ nullable: true })
    tokens?: string;
    
    @Column({ nullable: false })
    type_id?: number;

    type?: RrssType;

}