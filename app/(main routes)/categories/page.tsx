import type { Metadata } from "next";
import Container from "@/components/Container/Container";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import css from "./CategoriesPage.module.css";

export const metadata: Metadata = {
  title: "Категорії | Clothica",
  description: "Усі категорії одягу Clothica",
};

export default function CategoriesPage() {
  return (
    <Container className={css.section}>
      <h1 className={css.title}>Категорії</h1>
      <CategoriesList />
    </Container>
  );
}