import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('analysis')
export class Analysis {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    score: string;

    @Column({ nullable: false})
    pros: string;

    @Column({ nullable: false})
    cons: string;

    @OneToOne(() => Post, post => post.analysis)
    @JoinColumn({ name: 'post_id'})
    post?: Post;

}
