import Link from "next/link";
import css from "./Breadcrumbs.module.css";

interface BreadcrumbsProps {
  productName: string;
}

export default function Breadcrumbs({ productName }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={css.list}>
        <li>
          <Link href="/goods">Всі товари</Link>
        </li>

        <li className={css.currentPage} aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
}
