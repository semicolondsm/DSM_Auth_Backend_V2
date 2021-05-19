import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consumer } from "../../consumer/entity/consumer.entity";

@Entity("redirect")
export class Redirect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  redirect_url: string;

  @ManyToOne(() => Consumer, (consumer) => consumer.redirects)
  @JoinColumn({ name: "consumerId" })
  consumer: Consumer;
}
