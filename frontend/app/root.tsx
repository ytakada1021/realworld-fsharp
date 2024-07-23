import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "ionicons/css/ionicons.min.css";
import "~/styles/fonts.css";
// base.css must be last
import "~/styles/base.css";

const Header = () => (
  <nav className="navbar navbar-light">
    <div className="container">
      <a className="navbar-brand" href="/">
        conduit
      </a>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          {/* Add "active" class when you're on that page */}
          <a className="nav-link active" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/editor">
            {" "}
            <i className="ion-compose"></i>&nbsp;New Article{" "}
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/settings">
            {" "}
            <i className="ion-gear-a"></i>&nbsp;Settings{" "}
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile/eric-simons">
            <img src="" className="user-pic" />
            Eric Simons
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

const Footer = () => (
  <footer>
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
