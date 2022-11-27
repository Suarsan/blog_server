import { HtmlTag, Post } from "src/modules/posts/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('paragraph')
export class Paragraph {
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ nullable: false })
    content: string;
    
    @Column({ nullable: true })
    classes: string;
    
    @Column({ nullable: false })
    position: number;

    @ManyToOne(() => Post, post => post.paragraphs)
    @JoinColumn({ name: 'post_id',  })
    post?: Post;

    @ManyToOne(() => HtmlTag, htmlTag => htmlTag.paragraphs)
    @JoinColumn({ name: 'htmltag_id'})
    htmlTag?: HtmlTag;

}