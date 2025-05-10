import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "meandb_main" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column("varchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 100,
  })
  email: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "sessiontoken", nullable: true, length: 500 })
  sessiontoken: string | null;

  @Column("tinyint", {
    name: "active_status",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  active_status: boolean | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updated_at: Date | null;
}
