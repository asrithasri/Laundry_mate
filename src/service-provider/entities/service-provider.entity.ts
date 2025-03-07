import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ServiceProvider {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 10 })
  phoneNumber: string;

  @Column({ nullable: true })
  otp: string;

  @CreateDateColumn()
  createdAt: Date;
}
