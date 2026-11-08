"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import css from "./PopularProducts.module.css";


interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviewsCount: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    async function getPopularProducts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/popular`,
        );

        if (!response.ok) {
          throw new Error(`Помилка завантаження: HTTP ${response.status}`);
        }

        const data: ProductsResponse = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Не вдалося завантажити товари",
        );
      } finally {
        setLoading(false);
      }
    }

    getPopularProducts();
  }, []);

  
  const updatePagination = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const page = Math.round(slider.scrollLeft / slider.clientWidth);
    setActivePage(page);
  };

  const getPageCount = () => {
    const slider = sliderRef.current;

    if (!slider || !slider.clientWidth) return 1;

    return Math.max(1, Math.ceil(slider.scrollWidth / slider.clientWidth));
  };

  
  const scrollToPage = (page: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollTo({
      left: page * slider.clientWidth,
      behavior: "smooth",
    });

    setActivePage(page);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("uk-UA").format(price);

  return (
    <section className={css.section}>
      <div className={css.container}>
        {/* 🟩 Заголовок секції */}
        <div className={css.header}>
          <h2 className={css.title}>Популярні товари</h2>

          <Link href="/products" className={css.allProducts}>
            Всі товари
          </Link>
        </div>

        
        {loading && <p className={css.message}>Завантаження товарів...</p>}

       
        {error && <p className={css.error}>{error}</p>}

        
        {!loading && !error && products.length > 0 && (
          <>
            <div className={css.sliderWrapper}>
              <div
                className={css.productsList}
                ref={sliderRef}
                onScroll={updatePagination}
              >
                {products.map((product) => (
                  <article className={css.productCard} key={product._id}>
                    <Link
                      href={`/products/${product._id}`}
                      className={css.imageLink}
                    >
                      <div className={css.imageWrapper}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={css.productImage}
                        />
                      </div>
                    </Link>

                    <div className={css.productInfo}>
                      <div className={css.productTop}>
                        <div>
                          <h3 className={css.productName}>{product.name}</h3>
                          <p className={css.category}>{product.category}</p>
                        </div>

                        <p className={css.price}>
                          {formatPrice(product.price)} грн
                        </p>
                      </div>

                      <div className={css.rating}>
                        <span className={css.stars}>
                          {"★".repeat(Math.round(product.rating))}
                        </span>

                        <span className={css.reviews}>
                          <span aria-hidden="true">▤</span>
                          {product.reviewsCount}
                        </span>
                      </div>

                      <Link
                        href={`/products/${product._id}`}
                        className={css.detailsButton}
                      >
                        Детальніше
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              
              <button
                type="button"
                className={`${css.arrow} ${css.prev}`}
                onClick={() =>
                  scrollToPage(Math.max(0, activePage - 1))
                }
                disabled={activePage === 0}
                aria-label="Попередні товари"
              >
                ←
              </button>

              <button
                type="button"
                className={`${css.arrow} ${css.next}`}
                onClick={() =>
                  scrollToPage(
                    Math.min(getPageCount() - 1, activePage + 1),
                  )
                }
                disabled={activePage >= getPageCount() - 1}
                aria-label="Наступні товари"
              >
                →
              </button>
            </div>

           
            <div className={css.pagination}>
              {Array.from({ length: getPageCount() }).map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`${css.dot} ${
                    activePage === index ? css.activeDot : ""
                  }`}
                  onClick={() => scrollToPage(index)}
                  aria-label={`Сторінка ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {!loading && !error && products.length === 0 && (
          <p className={css.message}>Популярних товарів поки немає.</p>
        )}
      </div>
    </section>
  );
}