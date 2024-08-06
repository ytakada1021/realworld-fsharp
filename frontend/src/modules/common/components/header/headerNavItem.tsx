"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  segment: string | null;
};

export const HeaderNavItem = ({ href, children, segment }: Props) => {
  const currentSegment = useSelectedLayoutSegment();
  const isActive = currentSegment === segment;

  return (
    <Link className={clsx("nav-link", isActive && "active")} href={href}>
      {children}
    </Link>
  );
};
