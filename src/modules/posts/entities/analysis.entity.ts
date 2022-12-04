import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('analysis')
export class Analysis {
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ nullable: true })
    score: string;

    @Column({ nullable: true })
    pros: string;

    @Column({ nullable: true })
    cons: string;

    @Column({ nullable: false })
    post_id?: number;

}
