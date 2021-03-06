import { Consumer } from "../../../consumer/entity/consumer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 15 })
  name: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  identity: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 5 })
  gcn: string;

  @OneToMany(() => Consumer, (consumer) => consumer.user)
  consumers: Consumer[];
}
