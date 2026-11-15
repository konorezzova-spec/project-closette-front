import Link from "next/link";
import Container from "@/components/Container/Container";
import css from "./Footer.module.css";
import SubscribeForm from "./SubscribeForm";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.footer_top}>
          <div className={css.logo_wrap}>
            <Link className={css.link} href="/" aria-label="Home">
              <svg
                className={css.logo}
                width={84}
                height={36}
                aria-hidden="true"
              >
                <use href="/header/company_logo.svg" />
              </svg>
            </Link>
          </div>
          <div className={css.wrap_list}>
            <h3 className={css.list_title}>Меню</h3>
            <ul className={css.list}>
              <li>
                <Link className={css.list_item} href={"/"}>
                  Головна
                </Link>
              </li>
              <li>
                <Link className={css.list_item} href={"/goods"}>
                  Товари
                </Link>
              </li>
              <li>
                <Link className={css.list_item} href={"/categories"}>
                  Категорії
                </Link>
              </li>
            </ul>
          </div>
          <div className={css.subscribe_wrap}>
            <h3 className={css.subscribe_title}>Підписатися</h3>
            <p className={css.subscribe_text}>
              Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.
            </p>

            {<SubscribeForm />}
          </div>
        </div>

        <div className={css.footer_bottom}>
          <p className={css.copy}>&copy; 2026 Clothica. Всі права захищені.</p>
          <ul className={css.social_list}>
            <li className={css.social_item}>
              <a
                className={css.social_link}
                href=" https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  className={css.social_icon}
                  width={24}
                  height={24}
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#facebook" />
                </svg>
              </a>
            </li>

            <li className={css.social_item}>
              <a
                className={css.social_link}
                href="https://www.instagram.com/ "
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  className={css.social_icon}
                  width={24}
                  height={24}
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#instagram" />
                </svg>
              </a>
            </li>

            <li className={css.social_item}>
              <a
                className={css.social_link}
                href="https://x.com/ "
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X-social"
              >
                <svg
                  className={css.social_icon}
                  width={24}
                  height={24}
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#x" />
                </svg>
              </a>
            </li>

            <li className={css.social_item}>
              <a
                className={css.social_link}
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
              >
                <svg
                  className={css.social_icon}
                  width={24}
                  height={24}
                  aria-hidden="true"
                >
                  <use href="/icons/sprite.svg#youtube" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
