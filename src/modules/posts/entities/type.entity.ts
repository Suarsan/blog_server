import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('type')
export class Type {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    content: string;
  
    @OneToMany(() => Post, post => post.type)
    posts?: Post[];

}