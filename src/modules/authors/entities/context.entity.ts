import { Author } from "src/modules/authors/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('context')
export class Context {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    context: string;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => Author, author => author.context)
    @JoinColumn({ name: "author_id" })
    author?: Author;
}