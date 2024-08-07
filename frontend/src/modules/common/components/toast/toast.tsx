import clsx from "clsx";
import { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  header: ReactNode;
  body?: ReactNode;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
};

export const Toast = ({ header, body, onClickClose, className, ...rest }: Props) => {
  return (
    <div className={clsx("toast", className)} role="alert" aria-live="assertive" aria-atomic="true" {...rest}>
      <div className="toast-header">
        {header}
        <button type="button" className="close" data-dismiss="toast" aria-label="Close" onClick={onClickClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {body && <div className="toast-body">{body}</div>}
    </div>
  );
};
