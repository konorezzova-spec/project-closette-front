import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/category";
import css from "./CategoryCard.module.css";

type Props = { category: Category };

export default function CategoryCard({ category }: Props) {
  return (
    <Link href={`/goods?category=${category._id}`} className={css.card}>
      <div className={css.thumb}>
        {category.image && (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(min-width: 1440px) 416px, (min-width: 768px) 336px, 335px"
            className={css.img}
          />
        )}
      </div>
      <h3 className={css.name}>{category.name}</h3>
    </Link>
  );
}