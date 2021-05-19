import { User } from "../../shared/user/entity/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Redirect } from "../../redirect/entity/redirect.entity";

@Entity("consumers")
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 100, nullable: true })
  domain_url: string;

  @Column({ length: 100 })
  client_id: string;

  @Column({ length: 100 })
  client_secret: string;

  @ManyToOne(() => User, (user) => user.consumers)
  @JoinColumn({ name: "UserId" })
  user: User;

  @OneToMany(() => Redirect, (redirect) => redirect.consumer)
  redirects: Redirect[];

  redirect_url: string[] | string;
}
