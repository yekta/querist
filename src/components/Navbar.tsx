import IconSetNavbar, {
  TIconSetNavbarType,
} from "@components/icons/IconSetNavbar";
import BrandMark from "@components/logos/BrandMark";
import { LinkPropsOptions } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

interface TNavItem {
  label: string;
  href: LinkPropsOptions["to"];
  iconType: TIconSetNavbarType;
}

export default function Navbar() {
  const navItems: TNavItem[] = [
    {
      label: "Home",
      href: "/",
      iconType: "home",
    },
    {
      label: "Table Editor",
      href: "/tables",
      iconType: "table",
    },
    {
      label: "Query Editor",
      href: "/queries",
      iconType: "terminal",
    },
    {
      label: "schema",
      href: "/schema",
      iconType: "schema",
    },
    {
      label: "Settings",
      href: "/settings",
      iconType: "settings",
    },
  ];
  return (
    <nav className="w-full flex items-stretch justify-between border-b border-border">
      <Link
        to="/"
        className="py-2.5 px-3.5 flex items-center justify-center cursor-default hover:bg-background-secondary
        focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-inset"
      >
        <BrandMark className="w-6 h-6" />
      </Link>
      <nav className="flex items-center justify-center">
        <ul className="flex items-center justify-center">
          {navItems.map((navItem, i) => (
            <li key={i}>
              <NavbarLink
                {...navItem}
                isSelected={navItem.href === window.location.pathname}
              />
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-13 h-9" />
    </nav>
  );
}

interface TNavbarLinkProps extends TNavItem {
  isSelected: boolean;
}
function NavbarLink({ href, label, iconType, isSelected }: TNavbarLinkProps) {
  return (
    <Link
      aria-label={label}
      to={href}
      data-selected={isSelected ? "" : undefined}
      className="px-4 py-2.5 flex items-center justify-center cursor-default group/navlink hover:bg-background-secondary 
      transition data-[selected]:bg-border bg-border/0 focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-inset"
    >
      <IconSetNavbar
        type={iconType}
        data-selected={isSelected ? "" : undefined}
        className="w-6 h-6 transition group-hover/navlink:text-foreground text-foreground/60 
        data-[selected]:text-foreground group-hover/navlink:data-[selected]:text-foreground"
      />
    </Link>
  );
}
