import clsx from "clsx";
import { ComponentPropsWithoutRef, FC } from "react";

type FavoriteButtonProps = ComponentPropsWithoutRef<"button"> & {
  isFavorited?: boolean;
  favoritesCount?: number;
};

export const FavoriteButtonPreview: FC<FavoriteButtonProps> = ({
  isFavorited = false,
  favoritesCount = 0,
  className,
  ...rest
}) => {
  const variant = isFavorited ? "btn-primary" : "btn-outline-primary";

  return (
    <button className={clsx("btn btn-sm pull-xs-right", variant, className)} {...rest}>
      <i className="ion-heart"></i> {favoritesCount}
    </button>
  );
};
