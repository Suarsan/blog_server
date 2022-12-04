import { Author } from "src/modules/authors/entities";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Analysis } from "./analysis.entity";
import { Paragraph } from "./paragraph.entity";
import { Tag } from "./tag.entity";
import { Type } from "./type.entity";

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

    @Column({ nullable: false })
    author_id?: number;

    @Column({ nullable: false })
    type_id?: number;
    
    @Column({ nullable: false })

    parent_id?: number;
    
    author?: Author;

    type?: Type;

    parent?: Post;
    
    children?: Array<Post>;

    analysis?: Analysis;

    paragraphs?: Array<Paragraph>;
    
    tags?: Array<Tag>;

}