import {Entity,Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {

    @Column({primary:true, generated: true})
    id: number;

    @Column()
    name: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({default: "user"})
    role: string;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
    
}
