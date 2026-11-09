import css from "./Style.module.css";
import Container from "../Container/Container";

const benefits = [
  {
    id: 1,
    title: "Якість та натуральність",
    description:
      "тільки приємні до тіла тканини, які зберігають форму навіть після десятків прань.",
    image: "/style/thread.svg",
  },
  {
    id: 2,
    title: "Універсальний дизайн",
    description:
      "базові кольори та лаконічний стиль, що легко комбінуються між собою.",
    image: "/style/palette.svg",
  },
  {
    id: 3,
    title: "Комфорт на кожен день",
    description:
      "одяг, який не обмежує рухів і підходить для будь-якої ситуації.",
    image: "/style/shirt.svg",
  },
];

export default function Style() {
  return (
    <Container>
      <div className={css.styleContainer}>
        <h2 className={css.styleHeading}>
          Обери свій унікальний стиль сьогодні
        </h2>
        <ul className={css.list}>
          {benefits.map(benefit => (
            <li key={benefit.id} className={css.item}>
              <img
                className={css.image}
                src={benefit.image}
                alt=""
                height={56}
                width={56}
              />
              <h3 className={css.title}>{benefit.title}</h3>
              <p className={css.desc}>{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
