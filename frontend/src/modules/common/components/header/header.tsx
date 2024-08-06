import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { DefaultIcon } from "../icons/defaultIcon";
import { HeaderNavItem } from "./headerNavItem";
import { User } from "@/shared/types";

type HeaderProps = ComponentPropsWithoutRef<"header"> & {
  authUser?: User;
};

const UnauthenticatedMenus = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <HeaderNavItem href="/" segment={null}>
          Home
        </HeaderNavItem>
      </li>
      <li className="nav-item">
        <HeaderNavItem href="/login" segment="login">
          Sign in
        </HeaderNavItem>
      </li>
      <li className="nav-item">
        <HeaderNavItem href="/register" segment="register">
          Sign up
        </HeaderNavItem>
      </li>
    </ul>
  );
};

const AuthenticatedMenus = ({ authUser }: { authUser: User }) => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <HeaderNavItem href="/" segment={null}>
          Home
        </HeaderNavItem>
      </li>
      <li className="nav-item">
        <HeaderNavItem href="/editor" segment="editor">
          <i className="ion-compose"></i>&nbsp;New Article
        </HeaderNavItem>
      </li>
      <li className="nav-item">
        <HeaderNavItem href="/settings" segment="settings">
          <i className="ion-compose"></i>&nbsp;Settings
        </HeaderNavItem>
      </li>
      <li className="nav-item">
        <HeaderNavItem href={`/profile/${authUser.username}`} segment="profile">
          {authUser.image ? <img src={authUser.image} className="user-pic" /> : <DefaultIcon className="user-pic" />}
          {authUser.username}
        </HeaderNavItem>
      </li>
    </ul>
  );
};

export const Header = (props: HeaderProps) => {
  const { authUser, ...rest } = props;

  return (
    <header {...rest}>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" href="/">
            conduit
          </Link>
          {authUser ? <AuthenticatedMenus authUser={authUser} /> : <UnauthenticatedMenus />}
        </div>
      </nav>
    </header>
  );
};
