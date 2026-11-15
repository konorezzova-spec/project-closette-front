import css from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function Container({
  children,
  className = "",
  id,
}: ContainerProps) {
  return (
    <section className={`${css.container} ${className}`} id={id}>
      {children}
    </section>
  );
}
