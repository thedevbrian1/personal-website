import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import Nav from "./components/Nav";

export const links = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta = () => ({
  charset: "utf-8",
  title: "Brian Mwangi",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const navLinks = [
    {
      name: 'Home',
      path: '/',
      id: 1,
    },
    {
      name: 'Projects',
      path: '/#projects',
      id: 2,
    },
    {
      name: 'Contact me',
      path: '/#contact',
      id: 3,
    },
    {
      name: 'About',
      path: '/#about',
      id: 4,
    }
  ];

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"></link>
        <Links />
      </head>
      <body className="h-full bg-dark-blue">
        <header className="flex justify-between items-center absolute top-0 left-0 right-0 z-10 pt-8 px-6 lg:pl-12 lg:pr-16">
          {/* 
            TODO:
            LOGO ideas:
              - Make logo my name and it should glow
              - Make first letter of my name flicker like a faulty bulb
          */}
          <Link to="/">
            <h1 className="font-heading text-white uppercase">Brian Mwangi</h1>
          </Link>
          <Nav navLinks={navLinks} />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
