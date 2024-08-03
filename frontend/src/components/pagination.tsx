import clsx from "clsx";
import { ComponentPropsWithoutRef, FC } from "react";

type PaginationItemProps = ComponentPropsWithoutRef<"li"> & {
  href?: string;
  active?: boolean;
};

export const PaginationItem: FC<PaginationItemProps> = ({ href, active, className, children, ...rest }) => (
  <li className={clsx("page-item", className, active && "active")} {...rest}>
    <a className="page-link" href={href}>
      {children}
    </a>
  </li>
);

type PaginationProps = ComponentPropsWithoutRef<"ul">;

export const Pagination: FC<PaginationProps> = ({ className, children, ...rest }) =>
  children && (
    <ul className={clsx("pagination", className)} {...rest}>
      {children}
    </ul>
  );
