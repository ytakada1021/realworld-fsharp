import { ComponentPropsWithoutRef, FC } from "react";

type FooterProps = ComponentPropsWithoutRef<"footer">;

export const Footer: FC<FooterProps> = (props) => (
  <footer {...props}>
    <div className="container">
      <a href="/" className="logo-font">
        conduit
      </a>
      <span className="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
        under MIT.
      </span>
    </div>
  </footer>
);
