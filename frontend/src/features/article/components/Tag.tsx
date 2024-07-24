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

export type TagProps = TagPropsAsListItem | TagPropsAsAnchor;

export const Tag: FC<TagProps> = (props) => {
  const componentType = props.as;

  switch (componentType) {
    case "li":
      return <TagAsListItem {...props} />;
    case "a":
      return <TagAsAnchor {...props} />;
    default:
      // compilation fails if all cases are not covered
      ((_: never) => {})(componentType);
  }
};
