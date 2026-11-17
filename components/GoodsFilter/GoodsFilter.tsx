import Link from "next/link";
import css from "./GoodsFilter.module.css";
import PriceFilter from "../PriceFilter/PriceFilter";
import { Good } from "@/types/good";
import { Category } from "@/types/category";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface GoodsFilterProps {
  goods: Good[];
  totalItems: number;
  categories: Category[];
  selectedSizes: string[];
  maxPriceFromUrl: number;
  gender: string;
  clearAllFilters: () => void;
  updateParams: (key: string, value: string | string[]) => void;
  handleSizeChange: (size: string) => void;
  handleGenderChange: (value: string) => void;
}

export default function GoodsFilter({
  goods,
  totalItems,
  categories,
  selectedSizes,
  maxPriceFromUrl,
  gender,
  clearAllFilters,
  updateParams,
  handleSizeChange,
  handleGenderChange,
}: GoodsFilterProps) {
  //Ховаю фільтр
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  //Для активнрї категорії
  const pathname = usePathname();

  return (
    <>
      <div className={css.filter}>
        <div className={css.filterHeader}>
          <h2>Фільтри</h2>

          <button type="button" onClick={clearAllFilters}>
            Очистити всі
          </button>
        </div>
        <p className={css.resultsCount}>
          Показано {goods.length} із {totalItems} товарів
        </p>

        {/* Кнопка тільки для мобільної версії */}
        <div className={css.mobileFilter}>
          <button
            type="button"
            className={css.mobileFilterBtn}
            onClick={() => setIsFiltersOpen(prev => !prev)}
            aria-expanded={isFiltersOpen}
            aria-controls="mobile-filters"
          >
            Фільтри
            <span>
              {isFiltersOpen ? (
                <svg width="24" height="24">
                  <use href="/icons/symbol-defs.svg#icon-arrow_up" />
                </svg>
              ) : (
                <svg width="24" height="24">
                  <use href="/icons/symbol-defs.svg#icon-arrow_down" />
                </svg>
              )}
            </span>
          </button>
          <div
            className={`${css.filter_box_mobile} ${isFiltersOpen ? css.visible : css.hiden}`}
          >
            <div className={css.filter}>
              {/* Категорії */}
              <div className={css.filterSection}>
                <Link
                  href="/goods/filter/all"
                  className={pathname === "/goods/filter/all" ? css.active : ""}
                >
                  Усі
                </Link>
                <ul className={css.filterList}>
                  {categories?.map(category => (
                    <li key={category._id}>
                      <Link
                        href={`/goods/filter/${category._id}`}
                        className={
                          pathname === `/goods/filter/${category._id}`
                            ? css.active
                            : ""
                        }
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Розмір */}
              <div className={css.filterSection}>
                <div className={css.filterTitle}>
                  <h3>Розмір</h3>
                  <button
                    type="button"
                    onClick={() => updateParams("size", [])}
                  >
                    Очистити
                  </button>
                </div>

                <div className={css.checkboxList}>
                  {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(size => (
                    <label key={size}>
                      <input
                        type="checkbox"
                        value={size}
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Ціна */}
              <PriceFilter initialValue={maxPriceFromUrl} />

              {/* Стать */}
              <div className={css.filterSection}>
                <div className={css.filterTitle}>
                  <h3>Стать</h3>

                  <button
                    type="button"
                    onClick={() => updateParams("gender", "")}
                  >
                    Очистити
                  </button>
                </div>

                <div className={css.checkboxList}>
                  {[
                    { label: "Всі", value: "" },
                    { label: "Жіночий", value: "women" },
                    { label: "Чоловічий", value: "man" },
                    { label: "Унісекс", value: "unisex" },
                  ].map(item => (
                    <label key={item.value || "all"}>
                      <input
                        type="radio"
                        name="gender"
                        value={item.value}
                        checked={gender === item.value}
                        onChange={() => handleGenderChange(item.value)}
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={css.filter_box_tablet}>
          <div className={css.filter}>
            {/* Категорії */}
            <div className={css.filterSection}>
              <Link
                href="/goods/filter/all"
                className={pathname === "/goods/filter/all" ? css.active : ""}
              >
                Усі
              </Link>
              <ul className={css.filterList}>
                {categories?.map(category => (
                  <li key={category._id}>
                    <Link
                      href={`/goods/filter/${category._id}`}
                      className={
                        pathname === `/goods/filter/${category._id}`
                          ? css.active
                          : ""
                      }
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Розмір */}
            <div className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Розмір</h3>
                <button type="button" onClick={() => updateParams("size", [])}>
                  Очистити
                </button>
              </div>

              <div className={css.checkboxList}>
                {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map(size => (
                  <label key={size}>
                    <input
                      type="checkbox"
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Ціна */}
            <PriceFilter initialValue={maxPriceFromUrl} />

            {/* Стать */}
            <div className={css.filterSection}>
              <div className={css.filterTitle}>
                <h3>Стать</h3>

                <button
                  type="button"
                  onClick={() => updateParams("gender", "")}
                >
                  Очистити
                </button>
              </div>

              <div className={css.checkboxList}>
                {[
                  { label: "Всі", value: "" },
                  { label: "Жіночий", value: "women" },
                  { label: "Чоловічий", value: "man" },
                  { label: "Унісекс", value: "unisex" },
                ].map(item => (
                  <label key={item.value || "all"}>
                    <input
                      type="radio"
                      name="gender"
                      value={item.value}
                      checked={gender === item.value}
                      onChange={() => handleGenderChange(item.value)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
