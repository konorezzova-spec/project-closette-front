import css from "./Hero.module.css";
import Container from "../Container/Container";

export default function Hero() {
return 
    <Container className={css.hero}> 
        <p>Hero</p>
    </Container>;
}

