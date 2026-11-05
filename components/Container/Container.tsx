import css from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <section className={`${css.container} ${className}`}>{children}</section>
  );
}
