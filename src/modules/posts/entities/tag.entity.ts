import { Post } from "src/modules/posts/entities";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    content: string;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToMany(() => Post, post => post.tags)
    @JoinTable({ 
        name: 'post__tag',
        joinColumn: {
            name: "tag_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "post_id",
            referencedColumnName: "id"
        }
    })
    posts?: Post[];

}