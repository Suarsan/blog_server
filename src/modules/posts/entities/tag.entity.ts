import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "src/modules/posts/entities";

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