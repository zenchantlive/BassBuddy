import { ReactNode } from "react";
import classNames from "classnames";
import "../styles/card.css";

export default function Card({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={classNames(
        "card",
        className
      )}
    >
      {children}
    </div>
  );
}
