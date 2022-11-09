import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('type')
export class Type {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    content: string;
  
    @OneToMany(() => Post, post => post.type)
    posts?: Post[];

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

}