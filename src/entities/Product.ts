import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";

@Index("product_name", ["product_name"], { unique: true })
@Index("category_code", ["category_code"], {})
@Entity("product", { schema: "meandb_main" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column("varchar", {
    name: "product_name",
    nullable: true,
    unique: true,
    length: 100,
  })
  product_name: string | null;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price: string;

  @Column("varchar", { name: "image_url", nullable: true, length: 500 })
  image_url: string | null;

  @Column("char", { name: "category_code", length: 36 })
  category_code: string;

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

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "category_code", referencedColumnName: "uid" }])
  category_code2: Category;
}
