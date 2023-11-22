import IconSchema from "@components/icons/IconSchema";
import IconTable from "@components/icons/IconTable";
import {
  HomeIcon,
  CommandLineIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export type TIconSetNavbarType =
  | "home"
  | "table"
  | "terminal"
  | "schema"
  | "settings";

interface TIconSetNavbarProps extends React.SVGAttributes<SVGSVGElement> {
  type: TIconSetNavbarType;
}

export default function IconSetNavbar({
  type,
  className,
  ...rest
}: TIconSetNavbarProps) {
  if (type === "table") return <IconTable className={className} {...rest} />;
  if (type === "terminal")
    return <CommandLineIcon className={className} {...rest} />;
  if (type === "schema") return <IconSchema className={className} {...rest} />;
  if (type === "settings")
    return <Cog6ToothIcon className={className} {...rest} />;
  return <HomeIcon className={className} {...rest} />;
}
