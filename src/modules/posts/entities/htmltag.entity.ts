import { Paragraph } from "src/modules/posts/entities";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('html-tag')
export class HtmlTag {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({ nullable: false})
    content: string;

    @OneToMany(() => Paragraph, paragraph => paragraph.htmlTag)
    paragraphs?: Paragraph[];

}