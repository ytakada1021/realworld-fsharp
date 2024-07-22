import "@/styles/font.css";
import "@/styles/main.css";
import "ionicons/css/ionicons.min.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conduit",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              conduit
            </a>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Sign in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Sign up
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {children}
        <footer>
          <div className="container">
            <a href="/" className="logo-font">
              conduit
            </a>
            <span className="attribution">
              An interactive learning project from{" "}
              <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
              licensed under MIT.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
