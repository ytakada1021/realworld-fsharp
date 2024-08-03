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

const ButtonAsButtonTag: FC<ButtonProps> = ({
  className,
  children,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  ...rest
}) => {
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
    component: "a";
  };

const ButtonAsAnchorTag: FC<AnchorProps> = ({
  href = "",
  className,
  children,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  ...rest
}) => {
  return (
    <Link
      href={href}
      className={clsx("btn", sizeToClassNameMaps[size], colorToClassNameMaps[color], className)}
      {...rest}
    >
      {children}
    </Link>
  );
};

//////////////////////

type Props = ButtonProps | AnchorProps;

export const Button: FC<Props> = (props) => {
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
