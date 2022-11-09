import { Context } from "src/modules/contexts/entities";
import { Post } from "src/modules/posts/entities";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('author')
export class Author {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    email: string;

    @Column({ nullable: false})
    password: string;

    @Column({ nullable: false})
    firstname: string

    @Column({ nullable: false})
    lastname: string

    @CreateDateColumn()
    createdAt?: Date | string;
    
    @UpdateDateColumn()
    updatedAt?: Date | string;
    
    @OneToMany(() => Context, context => context.author)
    context?: Context;

    @OneToMany(() => Post, post => post.author)
    posts?: Array<Post>;
    
}
