import { Post } from "src/modules/posts/entities";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ nullable: false, unique: true })
    content: string;

    @ManyToMany(() => Post, post => post.tags)
    posts?: Post[];

}