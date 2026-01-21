import {Entity,Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class User {

    @Column({primary:true, generated: true})
    id: number;

    @Column()
    name: String;

    @Column({unique: true, nullable: false})
    email: String;

    @Column({nullable: false})
    password: String;

    @Column({default: "user"})
    role: String;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
    
}
