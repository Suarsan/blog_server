import { Author } from "src/modules/authors/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Analysis, Paragraph, Tag, Type } from "./index";

@Entity('post')
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

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

    @ManyToOne(() => Author, author => author.posts, { cascade: ['insert', 'update']})
    @JoinColumn({ name: 'author_id' })
    author?: Author;

    @Column()
    author_id?: number;
    
    @ManyToOne(() => Type, type => type.posts)
    @JoinColumn({ name: 'type_id' })
    type?: Type;

    @Column()
    type_id?: number;

    @OneToMany(() => Paragraph, paragraph => paragraph.post)
    paragraphs?: Paragraph[];

    @OneToOne(() => Analysis, analysis => analysis.post)
    analysis?: Analysis;

    @ManyToOne(() => Post, post => post.children)
    @JoinColumn({ name: 'parent_id' })
    parent?: Post;
    
    @Column()
    parent_id?: number;

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