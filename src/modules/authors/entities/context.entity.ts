import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('context')
export class Context {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    context: string;
    
    @Column({ nullable: false})
    author_id: number;

    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;
}