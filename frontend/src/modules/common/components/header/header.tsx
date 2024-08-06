import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Profile = {
  username: string;
  image: string;
};

type AuthenticatedHeaderProps = {
  isAuthenticated: true;
  activeMenu: "home" | "newArticle" | "settings" | "profile";
  profile: Profile;
};

type UnauthenticatedHeaderProps = {
  isAuthenticated: false;
  activeMenu: "home" | "signIn" | "signUp";
};

type HeaderProps = ComponentPropsWithoutRef<"header"> & (AuthenticatedHeaderProps | UnauthenticatedHeaderProps);

const createActiveClassName = (activeMenu: string, menu: string) => (activeMenu === menu ? "active" : undefined);

export const Header = (props: HeaderProps) => {
  const menus = props.isAuthenticated ? (
    <>
      <li className="nav-item">
        <Link className={clsx("nav-link", createActiveClassName("home", props.activeMenu))} href="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className={clsx("nav-link", createActiveClassName("newArticle", props.activeMenu))} href="/editor">
          <i className="ion-compose"></i>&nbsp;New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link className={clsx("nav-link", createActiveClassName("settings", props.activeMenu))} href="/settings">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={clsx("nav-link", createActiveClassName("profile", props.activeMenu))}
          href={`/profile/${props.profile.username}`}
        >
          <img src={props.profile.image || "https://picsum.photos/200"} className="user-pic" />
          {props.profile.username}
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className={clsx("nav-item", createActiveClassName("home", props.activeMenu))}>
        <Link className="nav-link" href="/">
          Home
        </Link>
      </li>
      <li className={clsx("nav-item", createActiveClassName("signIn", props.activeMenu))}>
        <Link className="nav-link" href="/login">
          Sign in
        </Link>
      </li>
      <li className={clsx("nav-item", createActiveClassName("signUp", props.activeMenu))}>
        <Link className="nav-link" href="/register">
          Sign up
        </Link>
      </li>
    </>
  );

  const { isAuthenticated, activeMenu, ...rest } = props;

  return (
    <header {...rest}>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" href="/">
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">{menus}</ul>
        </div>
      </nav>
    </header>
  );
};
