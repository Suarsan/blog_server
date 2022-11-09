import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "src/modules/authors/entities";
import { Analysis, Paragraph, Tag, Type } from "./index";

@Entity('post')
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    enabled: boolean;

    @Column({ nullable: false, unique: true })
    slug: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    image?: string;

    @Column({ nullable: true, name: 'read_time' })
    readTime?: number;

    @Column({ nullable: true, name: 'meta_title' })
    metaTitle?: string;

    @Column({ nullable: true, name: 'meta_description' })
    metaDescription?: string;

    @CreateDateColumn()
    createdAt?: Date | string;
    
    @UpdateDateColumn()
    updatedAt?: Date | string;

    @ManyToOne(() => Author, author => author.posts)
    @JoinColumn({ name: 'author_id' })
    author?: Author;
    
    @ManyToOne(() => Type, type => type.posts)
    @JoinColumn({ name: 'type_id' })
    type?: Type;

    @OneToMany(() => Paragraph, paragraph => paragraph.post)
    paragraphs?: Paragraph[];

    @OneToOne(() => Analysis, analysis => analysis.post)
    analysis?: Analysis;

    @ManyToOne(() => Post, post => post.children)
    @JoinColumn({ name: 'parent_id' })
    parent?: Post;

    @OneToMany(() => Post, post => post.parent)
    children?: Post[];

    @ManyToMany(() => Tag, tag => tag.posts)
    @JoinTable({ 
        name: 'post__tag',
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "tag_id",
            referencedColumnName: "id"
        }
    })
    tags?: Tag[]

}