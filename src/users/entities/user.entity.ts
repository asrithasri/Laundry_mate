import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 10 })
    phoneNumber: string;

    @Column({ nullable: true })
    otp: string;

    @Column({nullable: false})
    name?: string;

    @CreateDateColumn()
    createdAt: Date;



}
