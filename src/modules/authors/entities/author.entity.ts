import { Post } from "src/modules/posts/entities";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Context } from "./context.entity";

@Entity('author')
export class Author {
    
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false})
    email: string;

    @Column({ nullable: false})
    password?: string;

    @Column({ nullable: false})
    firstname: string

    @Column({ nullable: false})
    lastname: string

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    context?: Context;

    posts?: Array<Post>;
    
}
