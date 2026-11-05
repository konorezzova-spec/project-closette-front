import css from "./layout.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Container from "../components/Container/Container";

type Props = LayoutProps<"/"> & {
  modal: React.ReactNode;
};

export default async function RootLayout({ children, modal }: Props) {
  return (
    <Container className={css.layout_container}>
      <Header></Header>
      <main className={css.main}>{children}</main>
      {modal}
      <Footer></Footer>
    </Container>
  );
}
