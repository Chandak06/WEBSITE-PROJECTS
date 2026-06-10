"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const Header = () => {
  const pathName = usePathname();
  return (
    <header>
      <div className="container inner">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="coinPulse logo"
            width={132}
            height={40}
          ></Image>
        </Link>
        <nav>
          <Link
            href="/"
            className={cn("nav-link", {
              "is-active": pathName === "/",
              "is-home": true,
            })}
          >
            Home
          </Link>
          <p>Search</p>

          <Link
            href="/coins"
            className={cn("nav-link", {
              "is-active": pathName === "/coins",
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
