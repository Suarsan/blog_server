import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RrssConnection } from "./rrssConnection.entity";

@Entity('rrss-diffusion')
export class RrssDiffusion {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    date: Date;

    @Column({ nullable: false })
    uuid: string;
    
    @Column({ nullable: false })
    "rrss-connection_id": number;

    rrssConnection?: RrssConnection
}