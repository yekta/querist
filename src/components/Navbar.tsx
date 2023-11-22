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
    <div className="w-full flex items-center justify-center border-b border-c-outline">
      <div className="w-full flex items-center justify-between">
        <Link to="/" className="py-3 px-3.5">
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
      </div>
    </div>
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
      className={`px-4 py-3 flex items-center justify-center cursor-default group/navlink transition ${
        isSelected ? "bg-border" : "bg-border/0"
      }`}
    >
      <IconSetNavbar
        type={iconType}
        className={`w-6 h-6 transition group-hover/navlink:text-foreground ${
          isSelected ? "text-foreground" : "text-foreground/60"
        }`}
      />
    </Link>
  );
}
