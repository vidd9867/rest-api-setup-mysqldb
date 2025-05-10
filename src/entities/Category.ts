import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Index("category_name", ["category_name"], { unique: true })
@Entity("category", { schema: "meandb_main" })
export class Category {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column("varchar", {
    name: "category_name",
    nullable: true,
    unique: true,
    length: 100,
  })
  category_name: string | null;

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

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date | null;

  @OneToMany(() => Product, (product) => product.category_code2)
  products: Product[];
}
