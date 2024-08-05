import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";

///////////////////
// size

type Size = "sm" | "lg";

const DEFAULT_SIZE: Size = "sm";

const sizeToClassNameMaps: Record<Size, string> = {
  sm: "btn-sm",
  lg: "btn-lg",
};

///////////////////
// color

type Color = "primary" | "secondary" | "info" | "success" | "warning" | "danger";

const DEFAULT_COLOR: Color = "primary";

const colorToClassNameMaps: Record<Color, string> = {
  primary: "btn-outline-primary",
  secondary: "btn-outline-secondary",
  info: "btn-outline-info",
  success: "btn-outline-success",
  warning: "btn-outline-warning",
  danger: "btn-outline-danger",
};

//////////////////////

type CommonProps = {
  size?: Size;
  color?: Color;
};

///////////////////
// button pattern

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  CommonProps & {
    component: "button";
  };

const ButtonAsButtonTag = ({
  component,
  className,
  children,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  ...rest
}: ButtonProps) => {
  return (
    <button className={clsx("btn", sizeToClassNameMaps[size], colorToClassNameMaps[color], className)} {...rest}>
      {children}
    </button>
  );
};

///////////////////
// anchor pattern

type AnchorProps = ComponentPropsWithoutRef<"a"> &
  CommonProps & {
    href: string;
    component: "a";
  };

const ButtonAsAnchorTag = ({
  component,
  className,
  children,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  ...rest
}: AnchorProps) => {
  return (
    <Link className={clsx("btn", sizeToClassNameMaps[size], colorToClassNameMaps[color], className)} {...rest}>
      {children}
    </Link>
  );
};

//////////////////////

type Props = ButtonProps | AnchorProps;

export const Button = (props: Props) => {
  const componentType = props.component;

  switch (componentType) {
    case "button":
      return <ButtonAsButtonTag {...props} />;
    case "a":
      return <ButtonAsAnchorTag {...props} />;
    default:
      ((_: never) => null)(componentType);
  }
};
