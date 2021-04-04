import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 15 })
  name: string;

  @Column({ type: "varchar", length: 40 })
  identity: string;

  @Column({ type: "varchar", length: 200 })
  password: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 5 })
  gcn: string;
}
