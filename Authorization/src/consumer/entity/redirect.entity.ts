import { User } from "../../shared/user/entity/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consumer } from "./consumer.entity";

@Entity("redirect")
export class Redirect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  redirect_url: string;

  @ManyToOne(() => Consumer, (consumer) => consumer.redirects)
  @JoinColumn({ name: "consumer_id" })
  consumer: Consumer;
}
