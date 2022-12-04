import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HtmlTag } from "./htmltag.entity";

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

    @Column({ nullable: false })
    post_id?: number;

    @Column({ nullable: false })
    htmltag_id?: number;

    htmlTag?: HtmlTag;
}