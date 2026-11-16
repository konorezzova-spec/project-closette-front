import css from "./layout.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function MainLayout({ children, modal }: Props) {
  return (
    <section className={css.layout_container}>
      <Header />
      <div className={css.plug}></div>
      <main className={css.main}>
        {children}
      </main>
      {modal}
      <Footer />
    </section>
  );
}