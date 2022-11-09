import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('analysis')
export class Analysis {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    score: string;

    @Column({ nullable: true})
    pros: string;

    @Column({ nullable: true})
    cons: string;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @OneToOne(() => Post, post => post.analysis)
    @JoinColumn({ name: 'post_id'})
    post?: Post;

}
