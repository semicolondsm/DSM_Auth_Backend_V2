import { User } from "src/shared/user/entity/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 100, nullable: true })
  domain_url: string;

  @Column({ length: 200 })
  redirect_url: string;

  @Column({ length: 100 })
  client_id: string;

  @Column({ length: 100 })
  client_secret: string;

  @ManyToOne(() => User, (user) => user.consumers)
  @JoinColumn({ name: "user_id" })
  user: User;
}
