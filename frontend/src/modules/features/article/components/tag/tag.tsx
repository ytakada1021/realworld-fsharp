import { ExhaustiveError } from "@/shared/errors";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";

type TagVariant = "outline" | "filled";

const variantClassNameMaps: Record<TagVariant, string> = {
  outline: "tag-outline",
  filled: "",
};

type CommonTagProps = {
  variant?: TagVariant;
};

//////////////////////////
// list item pattern

type TagPropsAsListItem = CommonTagProps &
  ComponentPropsWithoutRef<"li"> & {
    as: "li";
  };

const TagAsListItem: FC<TagPropsAsListItem> = ({ children, variant = "filled", className, as, ...rest }) => (
  <li className={clsx("tag-default tag-pill", variantClassNameMaps[variant])} {...rest}>
    {children}
  </li>
);

//////////////////////////
// anchor pattern

type TagPropsAsAnchor = CommonTagProps &
  ComponentPropsWithoutRef<"a"> & {
    as: "a";
  };

const TagAsAnchor: FC<TagPropsAsAnchor> = ({ children, variant = "filled", href = "", className, as, ...rest }) => (
  <Link href={href} className={clsx("tag-default tag-pill", variantClassNameMaps[variant])} {...rest}>
    {children}
  </Link>
);

//////////////////////////
// span pattern

type TagPropsAsSpan = CommonTagProps &
  ComponentPropsWithoutRef<"span"> & {
    as: "span";
  };

const TagAsSpan: FC<TagPropsAsSpan> = ({ children, variant = "filled", className, as, ...rest }) => (
  <span className={clsx("tag-default tag-pill", variantClassNameMaps[variant])} {...rest}>
    {children}
  </span>
);

//////////////////////////

export type TagProps = TagPropsAsListItem | TagPropsAsAnchor | TagPropsAsSpan;

export const Tag: FC<TagProps> = (props) => {
  switch (props.as) {
    case "li":
      return <TagAsListItem {...props} />;
    case "a":
      return <TagAsAnchor {...props} />;
    case "span":
      return <TagAsSpan {...props} />;
    default:
      // compilation fails if all cases are not covered
      throw new ExhaustiveError(props);
  }
};
